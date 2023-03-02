/* eslint-disable @typescript-eslint/no-explicit-any */
import { Font } from '@jimp/plugin-print'
import Jimp from 'jimp'
import randomColor from 'randomcolor'

export interface IOptions {
  color?: string
  width?: number
  height?: number
  name?: string
}

class DefaultAvatar {
  private color: string
  private width: number
  private height: number
  private name: string

  private toShortName: (name: string) => string
  private getOffset: (font: Font, text: string) => number
  private getFontSize: (width: number) => number
  private getFont: (fontSize: number) => string
  private getMimeType: (mimeType: string) => string

  constructor(options = {} as IOptions) {
    this.color = options?.color?.match(/#(([0-9a-fA-F]{2}){3,4}|([0-9a-fA-F]){3,4})/g) ? options.color : randomColor()
    this.width = options?.width || 150
    this.height = options?.height || 150
    this.name = options?.name || 'John Doe'

    this.toShortName = toShortName
    this.getOffset = getOffset
    this.getFontSize = getFontSize
    this.getFont = getFont
    this.getMimeType = getMimeType
  }

  public createAvatarBuffer = async (): Promise<any> => {
    const { color, width, height, name } = this

    return new Promise((resolve, reject) => {
      new Jimp(width, height, color, (err, avatar) => {
        if (err) reject(err)

        Jimp.loadFont(this.getFont(this.getFontSize(width)), (err, font) => {
          if (err) reject(err)

          avatar.print(
            font,
            Math.floor(width / 2 - this.getOffset(font, this.toShortName(name)) / 2),
            Math.floor(height / 2 - this.getFontSize(width) / 2),
            this.toShortName(name)
          )

          resolve(avatar)
        })
      })
    }).then((avatar: any) => {
      return new Promise((resolve, reject) => {
        avatar.getBuffer(this.getMimeType('png'), (err: Error | null, buff: Buffer) => {
          if (err) reject(err)

          resolve({
            originalname: 'default.png',
            mimetype: 'image/png',
            buffer: buff,
          })
        })
      })
    })
  }
}

function toShortName(name: string): string {
  let str = ''
  const words = name.trim().split(' ')
  words.length == 1
    ? (str = words[0][0].toUpperCase())
    : (str = (words[0][0] + words[words.length - 1][0]).toUpperCase())

  return str
}

function getOffset(font: Font, text: string): number {
  let x = 0
  for (let i = 0; i < text.length; i++)
    if (font.chars[text[i]])
      x +=
        font.chars[text[i]].xoffset +
        (font.kernings[text[i]] && font.kernings[text[i]][text[i + 1]] ? font.kernings[text[i]][text[i + 1]] : 0) +
        (font.chars[text[i]].xadvance || 0)

  return x
}

function getFontSize(width: number): number {
  const availableSizes = [8, 16, 32, 64, 128]
  let size = availableSizes[availableSizes.length - 1]
  for (let i = 0; i < availableSizes.length; i++) {
    const thresholdSize = 2 * availableSizes[i]
    if (width <= thresholdSize) {
      size = availableSizes[i]
      break
    }
  }

  return size
}

function getFont(fontSize: number): string {
  switch (fontSize) {
    case 8:
      return Jimp.FONT_SANS_8_WHITE
    case 16:
      return Jimp.FONT_SANS_16_WHITE
    case 32:
      return Jimp.FONT_SANS_32_WHITE
    case 64:
      return Jimp.FONT_SANS_64_WHITE
    case 128:
      return Jimp.FONT_SANS_128_WHITE
    default:
      return Jimp.FONT_SANS_128_WHITE
  }
}

function getMimeType(mimeType: string): string {
  mimeType = mimeType || ''
  switch (mimeType.toLowerCase()) {
    case 'jpeg':
    case 'jpg':
      return Jimp.MIME_JPEG
    case 'png':
      return Jimp.MIME_PNG
    case 'bmp':
      return Jimp.MIME_BMP
    default:
      return Jimp.MIME_JPEG
  }
}

export { DefaultAvatar }
