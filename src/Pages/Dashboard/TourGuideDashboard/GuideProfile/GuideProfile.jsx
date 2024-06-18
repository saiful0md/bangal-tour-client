import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const GuideProfile = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();
    const { data: guide = [] } = useQuery({
        queryKey: ['guide', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/guide-profile/${user?.email}`)
            return res.data
        }
    })
    const handleUpdateProfile = async e => {
        e.preventDefault();
        const form = e.target;
        const contact = form.contact.value
        const workExprience = form.workExprience.value
        const skills = form.skills.value
        const education = form.education.value
        const image = user?.photoURL
        const guideInfo = {
            contact,
            workExprience,
            skills,
            education,
            image,
        }
        try {
            const { data } = await axiosSecure.patch(`/users/guide-update/${user?.email}`, guideInfo)
            if (data.modifiedCount > 0) {
                Swal.fire({
                    title: "Success!",
                    text: 'Update Successfully',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                })
            }
        }
        catch (err) {
            Swal.fire({
                title: "info!",
                text: err.response.data,
                icon: 'error',
                timer: 2500,
                showConfirmButton: false,
            })
        }
    }
    return (
        <div>
            <Helmet>
                <title>Bangal Tour | Guide Profile</title>
            </Helmet> <div className='max-h-screen flex items-center justify-center max-w-3xl mx-auto'>
                <div className="max-w-2xl mx-auto my-10  w-full">
                    <h2 className="text-3xl font-semibold text-center my-10 ">My Profile</h2>
                    <div className="card  bg-base-100 shadow-xl">
                        <figure><img className="h-24 w-24 rounded-full" src={user?.photoURL} alt={guide.name} /></figure>
                        <div className='flex justify-center mt-4 items-center'>
                            <h2 className='badge badge-accent'>{guide.role}</h2>
                        </div>
                        <div className="card-body items-center">
                            <h2><span className="font-bold">Name:</span> {guide.name}</h2>
                            <p><span className="font-bold">Email:</span> {guide.email}</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* update profile form */}
            <div className="hero-content ">
                <div className="card shrink-0 w-full max-w-2xl shadow-2xl bg-base-100">
                    <div className="text-center py-10">
                        <h2 className="text-3xl">Update Profie</h2>
                    </div>
                    <form onSubmit={handleUpdateProfile} className="card-body">
                        {/* row 1 */}
                        <div className="flex gap-6 justify-center">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" defaultValue={guide.name} readOnly name="name" placeholder="name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" defaultValue={guide.email} readOnly name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                        </div>
                        {/* row 2 */}
                        <div className="flex gap-6 justify-center">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Image</span>
                                </label>
                                <input type="text" name="image" defaultValue={user.photoURL} readOnly placeholder="Image" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Contact</span>
                                </label>
                                <input type="text" name="contact" placeholder="contact" className="input input-bordered" required />
                            </div>
                        </div>
                        {/* row3 */}
                        <div className="flex gap-6 justify-center">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Education</span>
                                </label>
                                <input type="text" name="education" placeholder="education" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Skills</span>
                                </label>
                                <input type="text" name="skills" placeholder="skills" className="input input-bordered" required />
                            </div>
                        </div>
                        {/* row 4 */}
                        <div className="flex gap-6 justify-center">
                            <div className="form-control w-3/4">
                                <label className="label">
                                    <span className="label-text">Work Experience</span>
                                </label>
                                <input type="text" name="workExprience" placeholder="work experience" className="input input-bordered" required />
                            </div>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GuideProfile;