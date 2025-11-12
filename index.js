const express = require("express");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const database = require("./config/database");
const Systemconfig= require("./config/system");
const methodoverrive = require("method-override");
const bodyparser = require("body-parser");


require("dotenv").config();
database.connect();
const app = express();
//use method chuyển đổi get post sang path 
app.use(methodoverrive("_method"));
//use bodyparser de lay dl tu form html
app.use(bodyparser.urlencoded({extended: false}));
//use express-flash cookie là ghi để tránh bị lộ phai cai ca sess va cookie de su dung
app.use(cookieParser('ADGJL'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

const port = process.env.port;

const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.router");
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
// App local o file  pug
app.locals.prefixAdmin = Systemconfig.prefixAdmin;
// khi lên onl thi nó ko hiểu dc static là gì phải thêm dirname
app.use(express.static(`${__dirname}/public`));
//routes
route(app);
routeAdmin(app);
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
