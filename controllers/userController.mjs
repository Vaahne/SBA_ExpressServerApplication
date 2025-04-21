import users from '../data/users.mjs';
import hateoas from '../hateoas/libraryHateoas.mjs'

// gets all users
function allUsers(req,res){
    const {userId} = req.query;
    if(userId){
        const user = users.find((b)=> b.userId == userId);
        if(user){
            return res.status(200).json({
                            ...user,
                            _links : hateoas.getUserLinks(userId)
                        });
        }
        return res.status(404).json(`User not found`);
    } 

    const userWithLinks = users.map((b)=>({
        ...b,
        _links:{
            href: `/lib/books/${b.userId}`
        }
    }));

    return res.json({
            users: userWithLinks,
            _links: hateoas.userHateoas()
        });
}

// get a user by userid
function specificUser(req,res,next){
    const id = req.params.id;
    
    if(id){
        const user = users.find((b)=> b.userId == id);
        if(user)
            return res.status(200).json({
                            ...user,
                            _links: hateoas.getUserLinks(id)
                        });
        return res.status(404).json(`User not found`);
    }
    return res.json("User not Found !!")
}

// adds a user to the data
function addUser(req,res){
    if(req.body && req.body.userName){
        const id = users[users.length-1].userId + 1;
        const user = {userId : id, userName : req.body.userName};
        users.push(user);    
        return res.status(201).json(user);
    }    
    return res.json("User Not Found");   
}
// updates or patch a username
function updateUser(req,res){
    const userId = req.params.id;

    const user = users.find((b,i)=> {
         if(b.userId == userId){
           users[i].userName = req.body.userName;
           return true;
        }
    });

    if(user)
        return res.status(200).json(user);
    return res.json(`User not found`);
}
// delete user by userid
function deleteUser(req,res){
    const userId = req.params.id;
    
    for(let u in users){
        if(users[u].userId == userId){
            const user = users[u];
            users.splice(u,1);
            return res.status(200).json(user);
        }
    }
    return res.json("User Not Found");   
}
export default {addUser,allUsers,deleteUser,updateUser,specificUser};