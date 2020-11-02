const app = require('../app');
const request = require('supertest')(app);
 
// request.get('/getUserInfo')
//         .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMzFhZTgzZjkyMGQyMjZhODE3YzI2MSIsIm5hbWUiOiJ3dWppbmciLCJhdmF0YXIiOiIvL3d3dy5ncmF2YXRhci5jb20vYXZhdGFyLzg1NzU0NWQ5Y2Y4ZTQyZTI5YTZlNTg4NDcwM2IxOGRjP3M9MjAwJnI9cGcmZD1tbSIsImlkZW50aXR5IjoiYWRtaW4iLCJpYXQiOjE1NTMwNzU0MjEsImV4cCI6MTU1MzA3OTAyMX0.ie3CiwojCnJkb0dXIT5rCc5a8P51oq02ogqsZt9vScs') 
//         .expect(200)
//         .end((err,res)=>{
//                 if(err) throw err
//                 console.log(res.user)
//         })
request.post('/register')
        .send({
          email:'305234583@qq.com',
          name:'吴京',
          password:'123456',
          identity:'admin'
        })
        .expect(200)
        .end((err,res)=>{
          // if(err) throw err;
        })
request.post('/userlogin')
        .send({email:'wujing@163.com',password:'123456'})
        .expect(200)
        .end((err,res)=>{
          
        })
// request.get('https://safebox.test.safecenter.com/webrelay/api/sbox/user/info')
//         .expect('ticket','cd340cb2a87fc960a4f71522922797bb')
//         .expect('Content-Type', 'application/json; charset=UTF-8')
//         .expect(200)
//         .end((err,res)=>{
//                 if(err) console.log(err);
//                 console.log(res)
//         })