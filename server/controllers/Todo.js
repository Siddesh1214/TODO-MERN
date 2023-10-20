const Todo = require("../models/Todo");
const { findByIdAndDelete } = require("../models/User");

exports.createTodo = async (req, res) => {
	try {
		// const { id } = req.params;
		const { title, description } = req.body;

		if (!title || !description) {
			return res.status(400).json({
				success: false,
				message: "Please provide a valid todo",
			});
		}

		const response = await Todo.create({ title, description, user: req.user });

		res.status(200).json({
			success: true,
			data: response,
			message: "Entry created Successfully",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: true,
			message: "Error in creating todo",
		});
	}
};

exports.getMyTodo = async (req, res) => {
	try {
		const userId = req.user._id;

		const todos = await Todo.find({ user: userId });

		return res.status(200).json({
			success: true,
			data: todos,
			message: "All Todos of the User are listed here",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: true,
			message: "Error in fetching todos",
		});
	}
};
exports.editTodo = async (req, res) => {
	try {
    const { id } = req.params;


    if (!id) {
			return res.status(400).json({
				success: false,
				message: "No id provided",
			});
    }

    const { title, description } = req.body;
    
    if (!title || !description) {
			return res.status(400).json({
				success: false,
				message: "Please provide a valid todo",
			});
    }

		const todo = await Todo.findByIdAndUpdate(
			{ _id: id },
      { title, description, updatedAt: Date.now() },
      {new:true}
      
    );
    
    
    
    res.status(200).json({
      success: true,
      data: todo,
      message:'Todo Updated successfully',
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error in updating TODO',
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    await Todo.findByIdAndDelete({ _id: id });

    res.status(200).json({
      success: true,
      message:'Todo Deleted successfully',
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error in Deleting TODO',
    });
  }
};
