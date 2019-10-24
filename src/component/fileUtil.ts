export default function urltoFile(url: string, filename ?: string, mimeType ?: string) {
    return fetch(url)
        .then(response => response.arrayBuffer())
        .then((buffer) => {
            if (!mimeType) {
                // If we can, try to infer from data string
                if (url.startsWith('data:')) {
                    const header = (url.split(',').shift() || '') // Get "data:image/png;base64" or similar
                        .replace(/^data:/, '') // Remove the head
                        .replace(/;base64$/, ''); // Remove the tail
                    // The header can contain additional metadata: https://en.wikipedia.org/wiki/Data_URI_scheme#Syntax
                    mimeType = header.split(';').shift() || '';
                }
                // If that didn't work, try to infer from the header
                if (!mimeType) {
                    // https://stackoverflow.com/a/29672957/1470607
                    const headerArray = new Uint8Array(buffer).subarray(0, 4);
                    var header = '';
                    for (var i = 0; i < headerArray.length; i++) {
                        header += headerArray[i].toString(16);
                    }
                    mimeType = headerToImageMime(header);
                }
            }
            return new File([buffer], filename || '', { type: mimeType });
        });
}

// https://stackoverflow.com/a/29672957/1470607
function headerToImageMime(header: string) {
    switch (header) {
    case '89504e47':
        return 'image/png';
    case '47494638':
        return 'image/gif';
    case 'ffd8ffe0':
    case 'ffd8ffe1':
    case 'ffd8ffe2':
    case 'ffd8ffe3':
    case 'ffd8ffe8':
        return 'image/jpeg';
    default:
        return 'unknown';
    }
}
