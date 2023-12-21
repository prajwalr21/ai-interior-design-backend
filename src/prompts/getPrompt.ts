// const editImagePrompt = "You are given an image of an interior of a house as the base image and a completely transparent image. Use the provided completely transparent mask image to overlay the {{}} style on the base image, with the primary color set to {{}} and the secondary color set to {{}}. Ensure that the final edited image not only reflects the chosen style and color scheme but also preserves the original layout present in the base image."
const editImagePrompt = 'Domestic interior based on {{}} style with a primary color {{}} and a secondary color {{}}'
export const getPrompt = (args: string[]): string => {
    let prompt = editImagePrompt
    args.forEach(arg => {
        prompt = prompt.replace("{{}}", arg)
    })
    return prompt
}