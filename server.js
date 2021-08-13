const express = require('express');
const app = express();
const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const familyMembers = [
    
{
    id:1,
    name:'Alice',
    primary_relationship:'Mother',
    secondary_relationship:'Wife',
    dob:'10/14/74'
},
{
    id:2,
    name:'Francisco',
    primary_relationship:'Father',
    secondary_relationship:'Husband',
    dob:'06/12/62'
},
{
    id:3,
    name:'Tyler',
    primary_relationship:'Child',
    primary_relationship_title:'Son',
    secondary_relationship:'Brother',
    dob:'05/10/91'
},
{
    id:4,
    name:'Haley',
    primary_relationship:'Child',
    primary_relationship_title:'Daughter',
    secondary_relationship:'Sister',
    dob:'09/03/95'
},
{
    id:5,
    name:'Cassidy',
    primary_relationship:'Child',
    primary_relationship_title:'Daughter',
    secondary_relationship:'Sister',
    dob:'04/17/98'
}
]


app.use(express.json());
app.use(express.urlencoded({extended: false }));

app.get('/', (req, res) => {
    console.log('index get is working')
    res.render('index');

})
//get all family members
app.get('/api/family', (req,res) => {
    res.render('family', {
        locals:{
         family:familyMembers
        }
    })
})
//get single family member
app.get('/api/family/:id', (req,res) => {
console.log(req.params.id);
let foundMember = familyMembers.find(member => member.id == req.params.id)
console.log(foundMember)
if(foundMember){
    res.render('memberProfile', {
        locals:{
            member:foundMember
        }
    })
}else{
    res.json({error:'Could not find requested family member!'})
}

})



app.listen(3000, (req,resp) => {
    console.log('app is listening on port 3000');
})