const Color = require('../models/colors.model')

class ColorController{
    create(data){
        return new Promise(
            (res, rej) => {
            try {
                const myColor = new Color({name:data.name,code:data.code})
                myColor.save()
                .then(
                    (success)=>{
                        res({
                            msg:"Color Added Successfully",
                            status:1
                        })
                    }
                ).catch(
                    (err)=>{
                        rej({
                            msg:"Unable To Add Color",
                            status:0
                        })
                    }
                )
            } catch (error) {
                rej({
                    msg:"Internal Server Error",
                    status:0
                })
            }
        }
        )
    }
    read(id){
        return new Promise(
            async (res, rej) => {
            try {
                let color
                if(id) {
                    color = await Color.findbyId(id)
                } else {
                    color = await Color.find()
                }
                res({
                    msg:"data found",
                    color,
                    status:1
                })                        
            } catch (error) {
                rej({
                    msg:"Internal Server Error",
                    status:0
                })
            }
        })
    }
    update(id,data){
        return new Promise(
            (res, rej) => {
            try {
                Color.updateOne({_id:id},{name:data.name,code:data.code})
                .then(
                    (success)=>{
                        res({
                            msg:"Color Updated Successfully",
                            status:1
                        })
                    }
                ).catch(
                    (err)=>{
                        rej({
                            msg:"Unable To Update Color",
                            status:0
                        })
                    }
                )
            } catch (error) {
                rej({
                    msg:"Internal Server Error",
                    status:0
                })
            }
        })
    }
    delete(id){
        return new Promise(
            (res, rej) => {
            try {
                Color.deleteOne({_id:id})
                .then(
                    (success)=>{
                        res({
                            msg:"Color Deleted Successfully",
                            status:1
                        })
                    }
                ).catch(
                    (err)=>{
                        rej({
                            msg:"Unable To Delete Color",
                            status:0
                        })
                    }
                )
            } catch (error) {
                rej({
                    msg:"Internal Server Error",
                    status:0
                })
            }
        })
    }
    changeStatus(id,stat){
        return new Promise(
            (res, rej) => {
            try {
                Color.updateOne({_id:id},{status:stat})
                .then(
                    (success)=>{
                        res({
                            msg:"Color Updated Successfully",
                            status:1
                        })
                    }
                ).catch(
                    (err)=>{
                        rej({
                            msg:"Unable To Update Color",
                            status:0
                        })
                    }
                )
            } catch (error) {
                rej({
                    msg:"Internal Server Error",
                    status:0
                })
            }
        })
    }
}

module.exports = ColorController