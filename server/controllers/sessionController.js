const session = require("../models/Session");
const Question = require("../models/Question");
const Session = require("../models/Session");

// @desc  create a new session and linked questions
// @route  post /api/sessios/create
// @access private
exports.createSession = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, description, questions } = 
        req.body;
        const userId = req.user._id;

        const session = await Session.create({
            user: userId,
            role,
            experience,
            topicsToFocus,
            description,
        });
        const questionDocs = await Promise.all(
            questions.map(async (q) => {
                const question = await Question.create({
                    session: session._id,
                    question: q.question,
                    answer: q.answer,
                });
                return question._id;
            })
        );

        session.questions = questionDocs;
        await session.save();
        res.status(201).json({ success: true, session});

    } catch (error) {
        res.status(500).json({ success: false, message: "server Error"});
    }
};      

// @desc  get all session for logged in user
// @route  get /api/sessios/my-sessions
// @access private
exports.getMySessions = async (req, res) => {
    try {
        const session = await Session.find({ user: req.user.id})
        .sort({ createdAt: -1})
        .populate("questions");
    res.status(200).json(session);
    } catch (error) {
        res.status(500).json({ success: false, message: "server Error"});
    }
};

// @desc  get a session by ID with populated questions
// @route  get /api/sessios/:id
// @access private
exports.getSessionById = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id)
        .populate({
            path: "questions",
            options: { sort: {isPinned: -1, createdAt: 1}},
        })
        .exec();

        if(!session) {
            return res
            .status(404)
            .json({ success: false, message: " session not found"});
        }
        res.status(200).json({success: true, session});
    } catch (error) {
        res.status(500).json({ success: false, message: "server Error"});
    }
};

// @desc  delete a session and its questions
// @route  delete /api/sessios/delete
// @access private
exports.deleteSessions = async (req, res) => {
    try {
        const session = await Session.findById (req.params.id);

        if(!session) {
            return res.status(404).json({ message: "Session not found"});
        }
        
        // check if the logged-in user owns this session
        if(session.user.toString() !== req.user.id) {
            return res
            .status(401)
            .json({message: "not Autherized to delete this session"})
        }

        await Question.deleteMany({ session: session._id});

        // delete the session
        await session.deleteOne();

        res.status(200).json({ message: "session deleted successfully"})
    } catch (error) {
        res.status(500).json({ succrss: false, message: "server Error"});
    }
};