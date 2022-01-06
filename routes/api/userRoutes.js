const router = require('express').Router();
const {
  getUsers,
  createUser
} = require('../../controllers/userController');

// /api/students
router.route('/').get(getUsers).post(createUser);

// // /api/students/:studentId
// router.route('/:studentId').get(getSingleStudent).delete(deleteStudent);

// // /api/students/:studentId/assignments
// router.route('/:studentId/assignments').post(addAssignment);

// // /api/students/:studentId/assignments/:assignmentId
// router.route('/:studentId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;
