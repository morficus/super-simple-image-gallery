const express = require('express'),
  router = express.Router(),
    fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  /**
   * Putting your logic in yours is considered a no-no just about everywhere...
   * But there was not point in over-structuring something so small.
   *
   * So in this instance.. I say welcome to bad practices!!
   * */

  // this path is relative to where you start the app NOT to this file...
  const base_image_path = './public/images',
      pageToLoad = parseInt(req.query['page']) || 1,
      itemsPerPage = 3;


  let nextPage = pageToLoad + 1,
      prevPage = pageToLoad - 1;



  fs.readdir(base_image_path, function (error, files_list) {
    if (error) {
      // TODO: do some error stuff
      res.render('error', {error: error});
    }

    const startingIndex = (pageToLoad - 1) * itemsPerPage,
        endingIndex = startingIndex + itemsPerPage,
        total = files_list.length,
        files_to_render = files_list.slice(startingIndex, endingIndex);

    // TODO: sorting stuff
    // for sorting by dates: https://nodejs.org/dist/latest-v7.x/docs/api/fs.html#fs_fs_fstatsync_fd

    if (endingIndex >= total) {
      nextPage = null;
    }

    res.render('index', {
                          images: files_to_render,
                          pagination: {
                                        total: total,
                                        currentPage: pageToLoad,
                                        nextPage: nextPage,
                                        prevPage: prevPage
                                      }
                          } );

  });
});

module.exports = router;
