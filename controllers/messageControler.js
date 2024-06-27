import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js"
import { Message} from "../models/messageSchema.js"

export const sendMessage = catchAsyncErrors(async (req, res, next) =>{
    const {sendName, subject, message} = req.body;
    if(!sendName || !subject || !message){
        return next(new ErrorHandler("please Fill Full form", 400));
    }
    const date = await Message.create({sendName, subject, message});
    res.status(200).json({
        success: true,
        message: "Message Sent",
        date,
    });
});

export const getAllmessage = catchAsyncErrors(async(req, res, next)  => {
    const messages = await Message.find();
    res.status(200).json({
        success:true,
        messages,
    });
});

export const deleteMessage = catchAsyncErrors(async (req, res, next) => {
    const {id} = req.params;
    const message = await Message.findById(id);
    if(!message){
        return next(new ErrorHandler("Message Already Deleted", 400));
    }
    await message.deleteOne();
    res.status(200).json({
        success: true,
        message: "Message Deleted"
    })
})

