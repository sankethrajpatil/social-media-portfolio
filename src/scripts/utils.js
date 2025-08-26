function isValidUrl(url) {
    const urlPattern = /^(https?:\/\/)?(www\.)?(instagram\.com|facebook\.com|linkedin\.com)\/.+$/;
    return urlPattern.test(url);
}

function formatUrl(url) {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return 'https://' + url;
    }
    return url;
}

function getEmbedCode(url) {
    if (!isValidUrl(url)) {
        throw new Error('Invalid URL');
    }
    const formattedUrl = formatUrl(url);
    let embedCode = '';

    if (formattedUrl.includes('instagram.com')) {
        embedCode = `<iframe src="${formattedUrl}/embed" width="400" height="500" frameborder="0" scrolling="no" allowtransparency="true"></iframe>`;
    } else if (formattedUrl.includes('facebook.com')) {
        embedCode = `<iframe src="https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(formattedUrl)}" width="400" height="500" frameborder="0" scrolling="no" allowtransparency="true"></iframe>`;
    } else if (formattedUrl.includes('linkedin.com')) {
        embedCode = `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:activity:${formattedUrl.split('/').pop()}" width="400" height="500" frameborder="0" scrolling="no" allowtransparency="true"></iframe>`;
    }

    return embedCode;
}