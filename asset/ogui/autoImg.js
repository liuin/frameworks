/*等比例缩放图片*/
function autoImg(ImgD, maxwidth, maxheight) {
    var image = new Image();
    image.src = ImgD.src;
    if (image.width > 0 && image.height > 0) {
        flag = true;
        if (image.width / image.height >= maxwidth / maxheight) {
            if (image.width > maxwidth) {
                ImgD.width = maxwidth;
                ImgD.height = (image.height * maxwidth) / image.width;
            } else {
                ImgD.width = image.width;
                ImgD.height = image.height;
            }
        }
        else {
            if (image.height > maxheight) {
                ImgD.height = maxheight;
                ImgD.width = (image.width * maxheight) / image.height;
            } else {
                ImgD.width = image.width;
                ImgD.height = image.height;
            }
        }
    }
}