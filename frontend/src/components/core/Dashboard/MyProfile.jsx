import { useEffect } from "react";
import { RiEditBoxLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { formattedDate } from "../../../utils/dateFormatter";
import IconBtn from "../../common/IconBtn";
import Img from "../../common/Img";
import { ACCOUNT_TYPE } from "../../../utils/constants";

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 🔴 Become Instructor Handler
  const becomeInstructorHandler = async () => {
    try {
      await axios.post("http://localhost:5000/profile/becomeInstructor", {
        userId: user._id,
      });

      alert("You are now an Instructor. Please login again.");

      // clear redux + storage
      dispatch({ type: "auth/logout" }); // if you have logout action
      localStorage.clear();

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <h1 className="mb-14 text-4xl font-medium text-richblack-5 font-boogaloo text-center sm:text-left">
        My Profile
      </h1>

      {/* Profile Card */}
      <div className="flex items-center justify-between rounded-2xl border border-richblack-700 bg-richblack-800 p-8 px-3 sm:px-12">
        <div className="flex items-center gap-x-4">
          <Img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-richblack-5 capitalize">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>

        <IconBtn
          text="Edit"
          onclick={() => navigate("/dashboard/settings")}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>

      {/* About Section */}
      <div className="my-10 flex flex-col gap-y-10 rounded-2xl border border-richblack-700 bg-richblack-800 p-8 px-7 sm:px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <IconBtn
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ??
            "Write Something About Yourself"}
        </p>
      </div>

      {/* Personal Details */}
      <div className="my-10 flex flex-col gap-y-10 rounded-2xl border border-richblack-700 bg-richblack-800 p-8 px-7 sm:px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">First Name</p>
              <p className="text-sm font-semibold text-richblack-5 capitalize">
                {user?.firstName}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm text-richblack-600">Account Type</p>
              <p className="text-sm font-semibold text-richblack-5 capitalize">
                {user?.accountType}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p className="text-sm font-semibold text-richblack-5">
                {user?.email}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm text-richblack-600">Gender</p>
              <p className="text-sm font-semibold text-richblack-5">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Last Name</p>
              <p className="text-sm font-semibold text-richblack-5 capitalize">
                {user?.lastName}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-semibold text-richblack-5">
                {user?.additionalDetails?.contactNumber ??
                  "Add Contact Number"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-semibold text-richblack-5">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 Become Instructor Section */}
      {user?.accountType === ACCOUNT_TYPE.STUDENT && (
        <div className="mt-10 rounded-2xl border border-yellow-400 bg-richblack-800 p-6">
          <h2 className="text-xl font-semibold text-richblack-5 mb-2">
            Want to become an Instructor?
          </h2>
          <p className="text-sm text-richblack-300 mb-4">
            Become an instructor to create courses and teach students.
          </p>
          <button
            onClick={becomeInstructorHandler}
            className="bg-yellow-400 text-black px-6 py-2 rounded font-semibold hover:bg-yellow-300 transition"
          >
            Become Instructor
          </button>
        </div>
      )}

      {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
        <div className="mt-10 rounded-2xl border border-green-500 bg-richblack-800 p-6">
          <p className="text-green-400 font-semibold">
            You are an Instructor ✅
          </p>
        </div>
      )}
    </>
  );
}
