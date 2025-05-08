// // import { useState } from 'react';
// // import { useAuth } from '../context/AuthContext';
// // import { motion } from 'framer-motion';
// // import { User, Mail } from 'lucide-react';
// // import { updateUserFullName, uploadAvatar } from '../services/userServices';
// // import AvatarUpload from '../components/AvatarUpload';
// // import toast from 'react-hot-toast';

// // const UserProfile = () => {
// //   const { currentUser, setCurrentUser } = useAuth();
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [fullName, setFullName] = useState(currentUser?.full_name || '');
// //   const [isLoading, setIsLoading] = useState(false);

// //   const handleUpdateName = async () => {
// //     if (!fullName.trim()) {
// //       toast.error('Name cannot be empty');
// //       return;
// //     }

// //     try {
// //       setIsLoading(true);
// //       const updatedUser = await updateUserFullName(currentUser.id, fullName);
// //       setCurrentUser(updatedUser);
// //       setIsEditing(false);
// //       toast.success('Name updated successfully');
// //     } catch (error) {
// //       toast.error('Failed to update name');
// //       console.error('Error updating name:', error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleAvatarUpload = async (file) => {
// //     try {
// //       const updatedUser = await uploadAvatar(currentUser.id, file);
// //       setCurrentUser(updatedUser);
// //       toast.success('Profile picture updated successfully');
// //     } catch (error) {
// //       toast.error('Failed to update profile picture');
// //       console.error('Error uploading avatar:', error);
// //     }
// //   };

// //   return (
// //     <div className="max-w-2xl mx-auto space-y-8">
// //       <motion.div
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         className="bg-white rounded-xl shadow-sm p-6 space-y-6"
// //       >
// //         <div className="flex items-center space-x-4">
// //           <div className="flex-shrink-0">
// //             <div className="relative h-24 w-24 rounded-full overflow-hidden bg-primary-100">
// //               {currentUser?.avatar_url ? (
// //                 <img
// //                   src={currentUser.avatar_url}
// //                   alt={currentUser.full_name}
// //                   className="h-full w-full object-cover"
// //                 />
// //               ) : (
// //                 <div className="h-full w-full flex items-center justify-center">
// //                   <User className="h-12 w-12 text-primary-600" />
// //                 </div>
// //               )}
// //             </div>
// //           </div>
          
// //           <div className="flex-1">
// //             <div className="space-y-1">
// //               {isEditing ? (
// //                 <div className="flex items-center space-x-2">
// //                   <input
// //                     type="text"
// //                     value={fullName}
// //                     onChange={(e) => setFullName(e.target.value)}
// //                     className="block w-full rounded-md border-gray-300 shadow-sm "
// //                     placeholder="Enter your name"
// //                   />
// //                   <motion.button
// //                     whileHover={{ scale: 1.05 }}
// //                     whileTap={{ scale: 0.95 }}
// //                     onClick={handleUpdateName}
// //                     disabled={isLoading}
// //                     className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
// //                   >
// //                     {isLoading ? 'Saving...' : 'Save'}
// //                   </motion.button>
// //                   <motion.button
// //                     whileHover={{ scale: 1.05 }}
// //                     whileTap={{ scale: 0.95 }}
// //                     onClick={() => {
// //                       setIsEditing(false);
// //                       setFullName(currentUser?.full_name || '');
// //                     }}
// //                     className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
// //                   >
// //                     Cancel
// //                   </motion.button>
// //                 </div>
// //               ) : (
// //                 <div className="flex items-center justify-between">
// //                   <h2 className="text-2xl font-bold text-gray-900">
// //                     {currentUser?.full_name}
// //                   </h2>
// //                   <motion.button
// //                     whileHover={{ scale: 1.05 }}
// //                     whileTap={{ scale: 0.95 }}
// //                     onClick={() => setIsEditing(true)}
// //                     className="text-primary-600 hover:text-primary-700"
// //                   >
// //                     Edit
// //                   </motion.button>
// //                 </div>
// //               )}
// //               <div className="flex items-center text-gray-500">
// //                 <Mail className="h-4 w-4 mr-2" />
// //                 <span>{currentUser?.email}</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="pt-6 border-t border-gray-200">
// //           <h3 className="text-lg font-medium text-gray-900 mb-4">
// //             Update Profile Picture
// //           </h3>
// //           <AvatarUpload
// //             onUpload={handleAvatarUpload}
// //             currentAvatar={currentUser?.avatar_url}
// //           />
// //         </div>
// //       </motion.div>
// //     </div>
// //   );
// // };

// // export default UserProfile;


// "use client"

// import { useState } from "react"
// import { useAuth } from "../context/AuthContext"
// import { motion, AnimatePresence } from "framer-motion"
// import { User, Mail, Edit2, Save, X, Camera, Leaf } from "lucide-react"
// import { updateUserFullName, uploadAvatar } from "../services/userServices"
// import AvatarUpload from "../components/AvatarUpload"
// import toast from "react-hot-toast"

// const UserProfile = () => {
//   const { currentUser, setCurrentUser } = useAuth()
//   const [isEditing, setIsEditing] = useState(false)
//   const [fullName, setFullName] = useState(currentUser?.full_name || "")
//   const [isLoading, setIsLoading] = useState(false)

//   const handleUpdateName = async () => {
//     if (!fullName.trim()) {
//       toast.error("Name cannot be empty")
//       return
//     }

//     try {
//       setIsLoading(true)
//       const updatedUser = await updateUserFullName(currentUser.id, fullName)
//       setCurrentUser(updatedUser)
//       setIsEditing(false)
//       toast.success("Name updated successfully")
//     } catch (error) {
//       toast.error("Failed to update name")
//       console.error("Error updating name:", error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleAvatarUpload = async (file) => {
//     try {
//       const updatedUser = await uploadAvatar(currentUser.id, file)
//       setCurrentUser(updatedUser)
//       toast.success("Profile picture updated successfully")
//     } catch (error) {
//       toast.error("Failed to update profile picture")
//       console.error("Error uploading avatar:", error)
//     }
//   }

//   return (
//     <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, ease: "easeOut" }}
//         className="bg-white rounded-2xl shadow-lg overflow-hidden"
//       >
//         {/* Header with green gradient background */}
//         <div className="bg-gradient-to-r from-emerald-600 via-green-500 to-lime-400 h-32 relative">
//           <motion.div
//             className="absolute -bottom-16 left-8 h-32 w-32 rounded-full border-4 border-white overflow-hidden shadow-lg bg-white"
//             whileHover={{ scale: 1.05 }}
//             transition={{ type: "spring", stiffness: 300 }}
//           >
//             {currentUser?.avatar_url ? (
//               <img
//                 src={currentUser.avatar_url || "/placeholder.svg"}
//                 alt={currentUser.full_name}
//                 className="h-full w-full object-cover"
//               />
//             ) : (
//               <div className="h-full w-full flex items-center justify-center bg-green-50">
//                 <User className="h-16 w-16 text-green-600" />
//               </div>
//             )}
//             <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
//               <Camera className="h-8 w-8 text-white" />
//             </div>
//           </motion.div>

//           {/* Decorative leaf elements */}
//           <div className="absolute top-4 right-4 text-green-100 opacity-30">
//             <Leaf className="h-8 w-8" />
//           </div>
//           <div className="absolute top-12 right-12 text-green-100 opacity-20">
//             <Leaf className="h-6 w-6 rotate-45" />
//           </div>
//         </div>

//         {/* Profile content */}
//         <div className="pt-20 px-8 pb-8">
//           <div className="space-y-6">
//             {/* Name and email section */}
//             <div>
//               <AnimatePresence mode="wait">
//                 {isEditing ? (
//                   <motion.div
//                     key="editing"
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: 10 }}
//                     className="space-y-4"
//                   >
//                     <div className="flex items-center space-x-3">
//                       <input
//                         type="text"
//                         value={fullName}
//                         onChange={(e) => setFullName(e.target.value)}
//                         className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:border-green-500 focus:ring-green-500 shadow-sm"
//                         placeholder="Enter your name"
//                       />
//                     </div>
//                     <div className="flex space-x-3">
//                       <motion.button
//                         whileHover={{ scale: 1.03 }}
//                         whileTap={{ scale: 0.97 }}
//                         onClick={handleUpdateName}
//                         disabled={isLoading}
//                         className="flex items-center justify-center px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 shadow-sm transition-colors w-full"
//                       >
//                         {isLoading ? (
//                           <div className="flex items-center">
//                             <svg
//                               className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                             >
//                               <circle
//                                 className="opacity-25"
//                                 cx="12"
//                                 cy="12"
//                                 r="10"
//                                 stroke="currentColor"
//                                 strokeWidth="4"
//                               ></circle>
//                               <path
//                                 className="opacity-75"
//                                 fill="currentColor"
//                                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                               ></path>
//                             </svg>
//                             Saving...
//                           </div>
//                         ) : (
//                           <div className="flex items-center">
//                             <Save className="h-4 w-4 mr-2" />
//                             Save
//                           </div>
//                         )}
//                       </motion.button>
//                       <motion.button
//                         whileHover={{ scale: 1.03 }}
//                         whileTap={{ scale: 0.97 }}
//                         onClick={() => {
//                           setIsEditing(false)
//                           setFullName(currentUser?.full_name || "")
//                         }}
//                         className="flex items-center justify-center px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm transition-colors w-full"
//                       >
//                         <X className="h-4 w-4 mr-2" />
//                         Cancel
//                       </motion.button>
//                     </div>
//                   </motion.div>
//                 ) : (
//                   <motion.div
//                     key="display"
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="flex flex-col space-y-2"
//                   >
//                     <div className="flex items-center justify-between">
//                       <h2 className="text-3xl font-bold text-gray-900">{currentUser?.full_name || "Your Name"}</h2>
//                       <motion.button
//                         whileHover={{ scale: 1.1, rotate: 5 }}
//                         whileTap={{ scale: 0.9 }}
//                         onClick={() => setIsEditing(true)}
//                         className="text-green-600 hover:text-green-800 p-2 rounded-full hover:bg-green-50 transition-colors"
//                       >
//                         <Edit2 className="h-5 w-5" />
//                       </motion.button>
//                     </div>
//                     <div className="flex items-center text-gray-600">
//                       <Mail className="h-4 w-4 mr-2 text-green-500" />
//                       <span>{currentUser?.email || "email@example.com"}</span>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* Divider with leaf decoration */}
//             <div className="relative border-t border-gray-200 my-6">
//               <div className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-white px-2">
//                 <Leaf className="h-5 w-5 text-green-400" />
//               </div>
//             </div>

//             {/* Avatar upload section */}
//             <div className="space-y-4">
//               <h3 className="text-xl font-semibold text-gray-900 flex items-center">
//                 <span>Update Profile Picture</span>
//                 <Leaf className="h-4 w-4 ml-2 text-green-500" />
//               </h3>
//               <motion.div
//                 whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
//                 transition={{ duration: 0.2 }}
//                 className="bg-green-50 rounded-xl p-6 border border-green-100"
//               >
//                 <AvatarUpload onUpload={handleAvatarUpload} currentAvatar={currentUser?.avatar_url} />
//               </motion.div>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   )
// }

// export default UserProfile


"use client"

import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { motion, AnimatePresence } from "framer-motion"
import { User, Mail, Edit2, Save, X, Camera, Leaf } from "lucide-react"
import { updateUserFullName, uploadAvatar } from "../services/userServices"
import toast from "react-hot-toast"

const UserProfile = () => {
  const { currentUser, setCurrentUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [fullName, setFullName] = useState(currentUser?.full_name || "")
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdateName = async () => {
    if (!fullName.trim()) {
      toast.error("Name cannot be empty")
      return
    }

    try {
      setIsLoading(true)
      const updatedUser = await updateUserFullName(currentUser.id, fullName)
      setCurrentUser(updatedUser)
      setIsEditing(false)
      toast.success("Name updated successfully")
    } catch (error) {
      toast.error("Failed to update name")
      console.error("Error updating name:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAvatarUpload = async (file) => {
    try {
      const updatedUser = await uploadAvatar(currentUser.id, file)
      setCurrentUser(updatedUser)
      toast.success("Profile picture updated successfully")
    } catch (error) {
      toast.error("Failed to update profile picture")
      console.error("Error uploading avatar:", error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        {/* Header with green gradient background */}
        <div className="bg-gradient-to-r from-emerald-600 via-green-500 to-lime-400 h-32 relative">
          <motion.div
            className="absolute -bottom-16 left-8 h-32 w-32 rounded-full border-4 border-white overflow-hidden shadow-lg bg-white"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {currentUser?.avatar_url ? (
              <img
                src={currentUser.avatar_url || "/placeholder.svg"}
                alt={currentUser.full_name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-green-50">
                <User className="h-16 w-16 text-green-600" />
              </div>
            )}

            <input
              type="file"
              id="avatar-upload"
              accept="image/jpeg, image/png"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (file) {
                  if (file.size > 2 * 1024 * 1024) {
                    toast.error("Image must be less than 2MB")
                    return
                  }

                  try {
                    toast.loading("Uploading image...")
                    await handleAvatarUpload(file)
                    toast.dismiss()
                  } catch (error) {
                    toast.dismiss()
                  }
                }
              }}
            />

            <div
              onClick={() => document.getElementById("avatar-upload").click()}
              className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
            >
              <Camera className="h-8 w-8 text-white" />
            </div>
          </motion.div>

          {/* Decorative leaf elements */}
          <div className="absolute top-4 right-4 text-green-100 opacity-30">
            <Leaf className="h-8 w-8" />
          </div>
          <div className="absolute top-12 right-12 text-green-100 opacity-20">
            <Leaf className="h-6 w-6 rotate-45" />
          </div>
        </div>

        {/* Profile content */}
        <div className="pt-20 px-8 pb-8">
          <div className="space-y-6">
            {/* Name and email section */}
            <div>
              <AnimatePresence mode="wait">
                {isEditing ? (
                  <motion.div
                    key="editing"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:border-green-500 focus:ring-green-500 shadow-sm"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="flex space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleUpdateName}
                        disabled={isLoading}
                        className="flex items-center justify-center px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 shadow-sm transition-colors w-full"
                      >
                        {isLoading ? (
                          <div className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Saving...
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Save className="h-4 w-4 mr-2" />
                            Save
                          </div>
                        )}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setIsEditing(false)
                          setFullName(currentUser?.full_name || "")
                        }}
                        className="flex items-center justify-center px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm transition-colors w-full"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="display"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-3xl font-bold text-gray-900">{currentUser?.full_name || "Your Name"}</h2>
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsEditing(true)}
                        className="text-green-600 hover:text-green-800 p-2 rounded-full hover:bg-green-50 transition-colors"
                      >
                        <Edit2 className="h-5 w-5" />
                      </motion.button>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-4 w-4 mr-2 text-green-500" />
                      <span>{currentUser?.email || "email@example.com"}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Divider with leaf decoration */}
            <div className="relative border-t border-gray-200 my-6">
              <div className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-white px-2">
                <Leaf className="h-5 w-5 text-green-400" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default UserProfile
