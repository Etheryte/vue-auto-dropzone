export default function urltoFile(url: string, filename ?: string, mimeType ?: string) {
    return fetch(url)
        .then(response => response.arrayBuffer())
        .then((buffer) => {
            // https://stackoverflow.com/a/29672957/1470607
            if (!mimeType) {
                const headerArray = new Uint8Array(buffer).subarray(0, 4);
                var header = '';
                for (var i = 0; i < headerArray.length; i++) {
                    header += headerArray[i].toString(16);
                }
                mimeType = headerToMime(header);
            }
            return new File([buffer], filename || '', { type: mimeType });
        });
}

// https://stackoverflow.com/a/29672957/1470607
function headerToMime(header: string) {
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
