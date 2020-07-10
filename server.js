const express = require('express');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/upload', (req, res, next) => {
    const form = formidable({
        multiples: true,
        uploadDir: './tmp/',
        keepExtensions: true
    });
    form.parse(req, (err, fields, files) => {
        console.log(fields);
        console.log(files);
        let data = {
            ...fields
        };
        const single = files.single;
        if (single) {
            console.log(single)
            if (single.size) {
                data.single = single.name;
            } else {
                fs.unlink(single.path, err => {

                });
            }
        }
        data.multiple = [];
        const multiple = files.multiple;
        if (multiple) {
            [multiple].flat().forEach(element => {
                if (element.size) {
                    data.multiple.push(element.name);
                } else {
                    fs.unlink(element.path, err => {

                    });
                }
            });
        }
        data.duplicate = [];
        const duplicate = files.duplicate;
        if (duplicate) {
            duplicate.forEach(element => {
                if (element.size) {
                    data.duplicate.push(element.name);
                } else {
                    fs.unlink(element.path, err => {

                    });
                }
            });
        }

        if (err) {
            res.send({
                status: 'fail',
                msg: err.msg
            });
        } else {
            res.send({
                status: 'ok',
                data: data
            });
        }
    });
});

app.get('/', (req, res) => {
    fs.createReadStream('./index.html').pipe(res);
});

app.listen(port, () => console.log(`Upload demo listening on port ${port}!`));
