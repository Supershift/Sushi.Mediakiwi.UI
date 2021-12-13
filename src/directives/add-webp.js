export default {
    bind: function (el, binding, vnode, oldVnode) {
        function getImageSources(inputImg, inputAlt) {
            if (!inputImg)
                return;

            // console.log('input :' + inputImg);
            var get_url_extension = function (url) {
                return url.split(/\#|\?/)[0].split('.').pop().trim();
            };

            var location = inputImg.toLowerCase();
            var extension = get_url_extension(location);
            var mimeType = '';
            switch (extension) {
                default:
                case 'jpg': mimeType = 'image/jpeg'; break;
                case 'png': mimeType = 'image/png'; break;
                case 'gif': mimeType = 'image/gif'; break;
                case 'webp': mimeType = 'image/webp'; break;
            }

            //console.log('ext:' + extension);

            var webPImg = location.replace('.jpg', '.webp');
            webPImg = webPImg.replace('.png', '.webp');

            return `<source srcset="${inputImg}" type="${mimeType}" />
                <source srcset="${webPImg}" type="image/webp" />                
                <img src="${inputImg}" alt="${inputAlt}" decoding="async" />`;
        }

        var imgUrl = binding.value.url;
        var imgAlt = binding.value.title;

        if (!imgUrl)
            return;

        el.innerHTML = getImageSources(imgUrl, imgAlt);
    }
} 