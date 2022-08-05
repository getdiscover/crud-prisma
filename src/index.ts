import express, { json, request, Request, Response } from "express"
import { prisma } from "./configs/database";



const app = express();



app.use(express.json())

app.get("/", (request: Request, response: Response) => {
    return response.status(200).json({status: 'is alive'})
})




// CREATE ✅
app.post('/create-user', async (request: Request, response: Response) => {
    const { username, email, password } = request.body

    const dbQuery = await prisma.users.create({
        data: {
            username,
            email,
            password
        }
    })


    return response.status(200).json(dbQuery)
});




// READ ✅
app.get('/get-user/:username', async (request: Request, response: Response) => {
    const { username } = request.params

    const dbQuery = await prisma.users.findUnique({
        where: {
           username
        },
        select: {
            id: true,
            username: true,
            email: true,
            Personal: true,
            password: false,
        }
    })

    if (!dbQuery) {
        return response.status(404).json("User not found")
    }

    return response.status(200).json(dbQuery)
});


app.get('/get-users', async (request: Request, response: Response) => {
    const dbQuery = await prisma.users.findMany({
        include: {
            Personal: true
        }
    });

    if (dbQuery.length < 1) {
        return response.status(404).json("Users with this end is not found")
    }


    return response.status(200).json(dbQuery)
})


// UPDATE ✅
app.patch('/update/account/:id/:username', async (request: Request, response: Response) => {
    const { id, username } = request.params

    const dbQuery = await prisma.users.update({
        where: {
            id
         },
         data: {
            username
         }
    })
    
    return response.status(200).json(dbQuery)
});


app.post('/users/:id/create-personal', async (request: Request, response: Response) => {
    const { id } = request.params
    const { fname, lname, age, city, desc } = request.body


    const dbQuery = await prisma.users.update({
        where: {
            id
        },
        data: {
            Personal: {create: {
                fname,
                lname,
                age,
                city,
                desc
            }}
        }
    })

    return response.status(200).json(dbQuery)
});




// DELETE ✅
app.delete('/admin/actions/delete-user/:id', async (request: Request, response: Response) => {
    const { id } = request.params
    
    const dbQuery = await prisma.users.delete({
        where: {
           id 
        }
    })

    return response.status(200).json(dbQuery)
})



app.listen(3300, () => {
    console.log(`Server listening on *3300`)
})