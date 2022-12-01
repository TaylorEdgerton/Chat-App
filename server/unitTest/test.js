var assert = require('assert');
var app = require('../server');
let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()
var http=require('http');
const { doesNotReject } = require('assert');
chai.use(chaiHttp)
BACKEND_URL = 'http://localhost:3000'


describe('CRUD APIs', ()=>{
    describe('Get /getAllUsers', () => {
        it('should return an array of all users', (done)=> {
            chai.request(app)
            .get('/getAllUsers')
            .end((err,res)=>{
                console.log(res.body)
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body[0].username.should.be.a('string');
                res.body[0].should.have.property('username')
                done();
            })
        });
    });


    describe('Post /validUser', () => {
        it('should return valid user', (done)=> {
            let upwd={
                username:"Test",
                pwd:"Test"
            };
       
           
            chai.request(app)
            .post('/validUser')
            .send({username:"Admin", pwd:"Admin"})
            .end((err,res)=>{
                console.log(res.body)
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body[0].username.should.be.a('string');
                res.body[0].should.have.property('username')
                done();
            })
        });
    });

        describe('Post /addGroup', () => {
            it('should return an object', (done)=> {
                chai.request(app)
                .post('/addGroup')
                .send({GroupName:"Test"})
                .end((err,res)=>{
                    console.log(res.body)
                    res.should.have.status(200);
                    res.body.should.be.a('Object');
                    res.body.should.have.property('created')
                    done();
                })
            });
    });

    describe('Post /newUser', () => {
        it('should return an object', (done)=> {
            chai.request(app)
            .post('/newUser')
            .send({username:"Test"})
            .end((err,res)=>{
                console.log(res.body)
                res.should.have.status(200);
                res.body.should.be.a('Object');
                res.body.should.have.property('created')
                done();
            })
        });
    });
});