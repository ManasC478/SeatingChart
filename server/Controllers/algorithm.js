// you can change the name of this function "assignSeats"
// if you do:
// make sure to change router.get('/algorithm', assignSeats) in routes/algorithm.js to router.get('/algorithm', newName)
// and the name in the import in router/algorithm.js

module.exports.assignSeats = (req, res) => {
    // a list I used for testing. you can delete it
    const dummyList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    
    try {
        // put your code in the try
        // you can have regular js function outside of the module.exports as helper functions
        // if an error occurs the code will automatically go to the catch

        // this is how you return item back to the frontend. if you have another list replace dummyList with your list
        res.status(200).json({ studentList: dummyList });
    } catch (error) {
        // print the error
        console.log(error);

        res.status(500).json({ error: 'Internal Error' });
    }
}