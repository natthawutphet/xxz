"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // ใช้ next/navigation แทน next/router สำหรับ Server Component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddDataPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    headline: '',
    content: '',
    youtube: ''
  });
  const [postData, setPostData] = useState([]); // เก็บข้อมูลที่ได้จาก API
  const router = useRouter();

  useEffect(() => {
    // สร้างฟังก์ชันเรียก API เมื่อคอมโพเนนต์ถูกโหลด
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.service-ads.com/vdo/');
        if (response.ok) {
          const data = await response.json();
          setPostData(data);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Show error message
        toast.error('Failed to fetch data. Please try again.');
      }
    };

    fetchData(); // เรียกใช้งานฟังก์ชัน fetchData
  }, []); // เรียกใช้ useEffect ครั้งแรกเท่านั้น

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api.service-ads.com/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('successfully!');
        setFormData({
          title: '',
          headline: '',
          content: '',
          youtube: ''
        });
      } else {
        throw new Error('Failed to add data');
      }
    } catch (error) {
      console.error('Error adding data:', error);
      toast.error('Failed to add data. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://api.service-ads.com/delete/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast.success('Data deleted successfully!');
        // สร้างฟังก์ชันสำหรับรีเฟรชหน้าหลังจากลบข้อมูล
        router.reload();
      } else {
        throw new Error('Failed to delete data');
      }
    } catch (error) {
      console.error('Error deleting data:', error);
      toast.error('Failed to delete data. Please try again.');
    }
  };

  return (
    <>
      <div className="d-flex justify-content-around">
        <div className="a w-50">
          <div className="container">
            <div className="text-center">
              <h3>Posts Youtube </h3>
              <form onSubmit={handleSubmit} className='mt-5 mb-5'>
              
              
                <div>
                  <label>Title:</label>
                  <input type="text" name="title" className='form-control' value={formData.title} onChange={handleChange} placeholder="title" />
                </div>
                <div>
                  <label>Headline:</label>
                  <input type="text" name="headline" className='form-control' value={formData.headline} onChange={handleChange} placeholder="headline" />
                </div>
                <div>
                  <label>Content:</label>
                  <textarea name="content" className='form-control' value={formData.content} onChange={handleChange} placeholder="content" />
                </div>
                <div>
                  <label>Youtube:</label>
                  <input type="text" name="youtube" className='form-control' value={formData.youtube} onChange={handleChange} placeholder="youtube" />
                </div>
                <button type="submit" className='btn btn-info m-4'>Add Data</button>

                <hr /><hr />
                <ul>
                  {postData.map((post) => (
                    <li key={post.id}>
                      {post.title} - 
                      <button type="button" onClick={() => handleDelete(post.id)}>Delete</button>
                    </li>
                  ))}
                </ul>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddDataPage;
