/**
 * 下载base64格式图片
 * @param base64
 * @param name
 */
export function downloadForBase64(base64: string, name: string) {
    const a = document.createElement('a')
    a.href = base64
    a.setAttribute('download', name)
    a.click()
}
