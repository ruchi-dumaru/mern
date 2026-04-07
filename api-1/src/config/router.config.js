const router=require("express").Router()

//app
//endpoint/url/req/routing/url

//http://locathost:9001/api/
router.get("/", (req, res, next) => {
  res.status(204).json({
    data: {
      name: "Titanic",
      release: 1990,
    },
  });
});

//http://localhost:9001/api/product
router.get("/product", (req, res, next) => {
  res.json({
    data: {
      name: "Kanfu ",
      release: 1990,
      duration: "2 hrs"
    },
  });
});
// app.post();
// app.put();
// app.patch();
// app.delete();

module.exports=router