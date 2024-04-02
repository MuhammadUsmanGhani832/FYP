const mongoose=require('mongoose')

// Create a student schema
const studentSchema = new mongoose.Schema({

  final:{
    type:Number,
    default:0
  },
  mid:{
    type:Number,
    default:0
  },
  quiz:{
    type:Number,
    default:0
  },
  assignment:{
    type:Number,
    default:0
  },
  presentation:{
    type:Number,
    default:0
  },
  other:{
    type:Number,
    default:0
  },
  total:{
    type:Number,
    default:''
  }, 
  email:{
    type:String,
  },
   courseId:{
    type:String,
  } 
  });
  
  // Create a student model
  const Student = mongoose.model('Student', studentSchema);


  module.exports = Student;