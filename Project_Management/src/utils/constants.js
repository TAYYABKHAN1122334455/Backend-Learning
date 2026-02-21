export const userRolesEnum={
    ADMIN:"admin",
    PROJECT_ADMIN:"project_admin",
    MEMBER:"member",
};
export const avaiableUserRole=Object.values(userRolesEnum);

export const taskStatusEnum={
    TODO:"todo",
    IN_PROGRESS:"in_progress",
    DONE:"done"
};

export const avaiableTaskStatusEnum=Object.values(taskStatusEnum);



/**
 * ============================================
 * USER ROLE ENUM (Role Based Access Control)
 * ============================================
 *
 * This object defines all possible roles that
 * a user can have inside the system.
 *
 * WHY WE NEED THIS?
 * -----------------
 * Instead of writing "admin", "member" etc
 * manually everywhere in the project
 * (routes, controllers, DB validation),
 * we centralize them in one place.
 *
 * This prevents:
 *  - Typo mistakes ("admn", "Admin")
 *  - Hardcoding values
 *  - Inconsistent role naming
 *
 * Used for:
 *  - Authorization middleware
 *  - Access control logic
 *  - Database validation
 *
 * Example:
 *  if(user.role === userRolesEnum.ADMIN)
 *      → allow project deletion
 
 * ============================================
 * AVAILABLE USER ROLE ARRAY
 * ============================================
 *
 * Object.values() extracts only the values
 * from userRolesEnum and converts them
 * into an array.
 *
 * Internally:
 * Object.values(userRolesEnum)
 * converts:
 *
 * {
 *   ADMIN:"admin",
 *   PROJECT_ADMIN:"project_admin",
 *   MEMBER:"member"
 * }
 *
 * into:
 * ["admin","project_admin","member"]
 *
 * WHY THIS ARRAY IS IMPORTANT?
 * ----------------------------
 * Used for:
 *  - Mongoose Schema enum validation
 *  - Request body validation
 *  - Role checking in middleware
 *
 * Example:
 * role:{
 *    type:String,
 *    enum:avaiableUserRole
 * }

 * ============================================
 * TASK STATUS ENUM (Workflow State Control)
 * ============================================
 *
 * Defines all possible states of a task
 * in the project management system.
 *
 * Represents Task Lifecycle:
 *  1. TODO
 *  2. IN_PROGRESS
 *  3. DONE
 *
 * WHY WE NEED THIS?
 * -----------------
 * Ensures:
 *  - Task always has valid status
 *  - No random values like "finished"
 *  - Maintains workflow consistency
 *
 * Used in:
 *  - Task update APIs
 *  - Dashboard filters
 *  - Progress tracking logic
 * 
 * ============================================
 * AVAILABLE TASK STATUS ARRAY
 * ============================================
 *
 * Converts taskStatusEnum into array format
 * for validation purposes.
 *
 * Output:
 * ["todo","in_progress","done"]
 *
 * Used for:
 *  - Database enum validation
 *  - API input validation
 *  - Preventing invalid task states
 *
 * Example:
 * status:{
 *    type:String,
 *    enum:avaiableTaskStatusEnum
 * }
 */