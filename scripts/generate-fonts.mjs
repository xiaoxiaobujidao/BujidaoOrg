import { createRequire } from 'node:module'
import { mkdir, readdir, readFile, rename, rm, stat, writeFile } from 'node:fs/promises'
import { dirname, extname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const Fontmin = require('fontmin')

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const FONTS_DIR = join(ROOT, 'assets/fonts')

const BASE_CHARS = [
  ' \n\t',
  '0123456789',
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  '.,;:!?\'"()[]{}+-=*/_%@#&',
  '～。，、；：？！「」『』（）…—·',
].join('')

const SCAN_DIRS = [
  'i18n/locales',
  'pages',
  'components',
  'layouts',
]

const SCAN_FILES = ['app.vue']

const FONT_TARGETS = [
  {
    source: '方正准圆简体.ttf',
    output: '方正准圆简体_compressed.ttf',
    charsFile: '方正准圆简体.txt',
  },
  {
    source: '沐瑶软笔手写体.ttf',
    output: '沐瑶软笔手写体_compressed.ttf',
    charsFile: '沐瑶软笔手写体.txt',
  },
]

const TEXT_EXTENSIONS = new Set(['.js', '.vue', '.ts', '.tsx', '.jsx', '.json', '.md', '.txt'])

async function walkFiles(dir, files = []) {
  let entries

  try {
    entries = await readdir(dir, { withFileTypes: true })
  } catch {
    return files
  }

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)

    if (entry.isDirectory()) {
      await walkFiles(fullPath, files)
      continue
    }

    if (TEXT_EXTENSIONS.has(extname(entry.name))) {
      files.push(fullPath)
    }
  }

  return files
}

async function collectSourceFiles() {
  const files = []

  for (const dir of SCAN_DIRS) {
    const fullDir = join(ROOT, dir)
    await walkFiles(fullDir, files)
  }

  for (const file of SCAN_FILES) {
    const fullPath = join(ROOT, file)
    try {
      if ((await stat(fullPath)).isFile()) {
        files.push(fullPath)
      }
    } catch {
      // ignore missing optional files
    }
  }

  return [...new Set(files)]
}

function extractCharacters(contents) {
  const chars = new Set()

  for (const char of contents) {
    if (!char || char === '\r') {
      continue
    }
    chars.add(char)
  }

  return chars
}

export async function collectUsedCharacters() {
  const files = await collectSourceFiles()
  const chars = new Set(BASE_CHARS)

  for (const file of files) {
    const contents = await readFile(file, 'utf8')
    for (const char of extractCharacters(contents)) {
      chars.add(char)
    }
  }

  return [...chars].sort((a, b) => a.codePointAt(0) - b.codePointAt(0)).join('')
}

function subsetFont({ source, output, text }) {
  const sourcePath = join(FONTS_DIR, source)
  const outputPath = join(FONTS_DIR, output)
  const tempDir = join(FONTS_DIR, '.fontmin-tmp')

  return new Promise((resolvePromise, reject) => {
    const fontmin = new Fontmin()
      .src(sourcePath)
      .use(Fontmin.glyph({ text, hinting: false }))
      .dest(tempDir)

    fontmin.run(async (error) => {
      if (error) {
        reject(error)
        return
      }

      try {
        const generatedPath = join(tempDir, source)
        await rename(generatedPath, outputPath)
        await rm(tempDir, { recursive: true, force: true })
        resolvePromise(outputPath)
      } catch (moveError) {
        reject(moveError)
      }
    })
  })
}

async function writeCharsFile(charsFile, text) {
  const outputPath = join(FONTS_DIR, charsFile)
  const lines = text.match(/.{1,40}/gu) ?? []
  await writeFile(outputPath, `${lines.join('\n')}\n`, 'utf8')
}

async function main() {
  await mkdir(FONTS_DIR, { recursive: true })

  const text = await collectUsedCharacters()
  console.log(`Collected ${[...text].length} unique characters from project sources.`)

  for (const font of FONT_TARGETS) {
    const sourcePath = join(FONTS_DIR, font.source)

    try {
      await stat(sourcePath)
    } catch {
      console.warn(`Skip ${font.output}: source font not found at ${font.source}`)
      continue
    }

    await writeCharsFile(font.charsFile, text)
    const outputPath = await subsetFont({ ...font, text })
    console.log(`Generated ${relative(ROOT, outputPath)}`)
    console.log(`Updated ${join('assets/fonts', font.charsFile)}`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
