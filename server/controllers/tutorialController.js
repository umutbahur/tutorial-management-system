import db from '../models/index.js';
const { Tutorial, User } = db; // destructure User from db

// @desc Get tutorials owned by logged-in user
// @route GET /api/tutorials/my
// @access Private
export const getMyTutorials = async (req, res) => {
  try {
    const userId = req.user?.id; // <-- fixed
    if (!userId) return res.status(401).json({ message: "Not authorized" });

    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const myTutorials = await Tutorial.findAll({
      where: { userId },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
    });

    res.json(myTutorials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// @desc Get all tutorials
// @route GET /api/tutorials
export const getTutorials = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const tutorials = await Tutorial.findAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "ASC"]],
    });
    res.json(tutorials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOneTutorial = async (req, res) => {
  try {
    const { id } = req.params;

    const tutorial = await Tutorial.findByPk(id, {
      include: {
        model: User,
        as: 'user',
        attributes: ['username'], // include what you need
      },
    });

    if (!tutorial) {
      return res.status(404).json({ message: "Tutorial not found" });
    }

    res.json(tutorial);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Create tutorial
// @route POST /api/tutorials
export const createTutorial = async (req, res) => {
  try {
    const { title, description, published } = req.body;
    const tutorial = await Tutorial.create({ 
      title, 
      description, 
      published,
      userId: req.user.id,
    });
    res.status(201).json(tutorial);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Update tutorial
// @route PUT /api/tutorials/:id
export const updateTutorial = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, published } = req.body;

    const tutorial = await Tutorial.findByPk(id);
    if (!tutorial) return res.status(404).json({ message: 'Tutorial not found' });

    // Ownership check
    if (req.user.role !== 'admin' && tutorial.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not allowed to update this tutorial' });
    }

    tutorial.title = title || tutorial.title;
    tutorial.description = description || tutorial.description;
    tutorial.published = published !== undefined ? published : tutorial.published;

    await tutorial.save();
    res.json(tutorial);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Delete tutorial
// @route DELETE /api/tutorials/:id
export const deleteTutorial = async (req, res) => {
  try {
    const { id } = req.params;

    const tutorial = await Tutorial.findByPk(id);
    if (!tutorial) return res.status(404).json({ message: 'Tutorial not found' });

    // Ownership check
    if (req.user.role !== 'admin' && tutorial.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not allowed to delete this tutorial' });
    }

    await tutorial.destroy();
    res.json({ message: 'Tutorial deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
