const { ContactUs } = require("../../models")


module.exports = {

      contactAdd:async(req,res)=>{
        try {
            const {name,email,phone,message} = req.body

             const newContact = await ContactUs.create({
                name,email,phone,message
             })
               return res.status(200).json({
                    message: 'Contact add successfully',
                    data: newContact
                });
        } catch (error) {
             console.error('Error adding to contact:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
      }
}
