const express=require('express');
const mongoose=require('mongoose');
const cities=require('./cities');
const {places,descriptors}=require('./seedHelpers');
const path=require('path');
const Campground=require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
});

const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
})

const sample=array => array[Math.floor(Math.random()*array.length)];

const seedDB=async ()=>{
    await Campground.deleteMany({});
    for(let i=0;i<50;i++){
        const random1000=Math.floor(Math.random()*1000)
        const price=Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            author:'60f30c7e9b833c252c033543',
            location:`${cities[random1000].city},${cities[random1000].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, ducimus nemo odit a quo, at veritatis magnam dolores quibusdam quod voluptatem laborum possimus nostrum illo, labore mollitia! Magni, nulla quasi?',
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/dhtlrr2x1/image/upload/v1626706309/YelpCamp/mazj705p9m7s5aymd5f6.jpg',
                  filename: 'YelpCamp/mazj705p9m7s5aymd5f6'
                },
                {
                  url: 'https://res.cloudinary.com/dhtlrr2x1/image/upload/v1626706310/YelpCamp/nxvgkr9ezcb7vmzblqhv.jpg',
                  filename: 'YelpCamp/nxvgkr9ezcb7vmzblqhv'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})