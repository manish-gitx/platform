const{db}=require("./key");
const cors=require("cors");
const express=require("express")
const admin=express();
admin.use(cors());
admin.use(express.json());
const{courseSchema,course_daySchema}=require("../Schema/schema");

admin.post("/courses", async function(req,res){
    const { week, title, no_challenges, img_src, new_field } = req.body;
   const isInputs= courseSchema.safeParse(req.body);
   if(isInputs.success){
    try{
        const resp = await db.collection('course').doc(`week ${week}`);
        resp.set({ assets: [] }, { merge: true });
        resp.set(req.body,{merge:true});
        res.send("success");
        
    }
    catch{
        res.send("db error")
    } 

   }
   else{
    res.send("wrong inputs")
   }
   
})

admin.get("/courses", async function(req, res) {
    try {
        const courseCollection = await db.collection('course').get();
        
        const courses = [];
        courseCollection.forEach(doc => {
            courses.push({ id: doc.id, ...doc.data() });
        });
        res.json(courses);
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).send("Error fetching data");
    }
});

admin.post("/courses/week/:id", async function(req, res) {
    const { id } = req.params;
    const resp = await db.collection('course').doc(`week ${id}`).get();
    const doc=resp.data();  
    let arr=doc.assets;
    for(let i=0;i<arr.length;i++){
        if(arr[i].day===req.body.day){
            arr.splice(i,i+1);
            break;
        }
    }
    arr.push(req.body);
    await db.collection('course').doc(`week ${id}`).update({
        assets:arr
    })
    res.send("sucess")
});
admin.get("/courses/week/:id", async function(req, res) {
    const { id } = req.params;
    const resp = await db.collection('course').doc(`week ${id}`).get();
    const doc=resp.data();  
    let arr=doc.assets;
    res.send(arr)
});

admin.listen(3000);

