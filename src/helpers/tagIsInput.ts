type tagIsInputParams = {
    tag: 'input' | 'textarea'
    value: string
}

export const tagIsInput = (params: tagIsInputParams): string | undefined => {
    const {tag, value} = params;
    return tag === 'input' ? value : undefined;
};