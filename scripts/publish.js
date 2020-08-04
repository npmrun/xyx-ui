var ghpages = require('gh-pages');
 
ghpages.publish('storybook-static', function(err) {
  if(err) throw err;
  console.log('storybook同步完成!')
});