import { useState } from "react"
import { toast } from 'react-toastify';
import { Mosaic } from "react-loading-indicators";
import dummy from "../assets/dummy.png"

export const Hero = () => {
  let [photos, setPhoto] = useState(false);
  let [promptdata, setPrompt] = useState('');
  const [genImage, setImage] = useState('');
  const [generating, setGenerating] = useState(false);
  const [isImageExist, setImageExist] = useState(true);

  const generateImage = async (e) => {
    e.preventDefault();
    const prompt = e.target.prompt.value;
    if (prompt) {
      setPrompt(prompt);
      try {
        setGenerating(true);
        const response = await fetch('https://ai-image-generator-backend-rl2n.onrender.com/api/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: prompt })
        })
        const { photo } = await response.json();
        const base64String = btoa(String.fromCharCode(...new Uint8Array(photo.data)));
        setImage(base64String);
        setPhoto(true);
        setGenerating(false);
        setImageExist(true);
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function handleCreatePost(e) {
    if(photos===false){
      setImageExist(false);
      return;
    }
    e.preventDefault();
    try {
      setGenerating(true);
      const response = await fetch('https://ai-image-generator-backend-rl2n.onrender.com/api/dalle/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: promptdata, photo:genImage })
      })
      const { status } = await response.json();
      notify()
      setGenerating(false);
      setPhoto(false);
      setImageExist(true);
    } catch (err) {
      console.log(err);
    }
  }
  const notify = () => toast("Post saved successfully!! ❤️");

  return (
    <div className="bg-white grid md:grid-cols-2 justify-center mt-[5%] rounded-[10px]">
      <div className="flex flex-col gap-[10px] p-[5%]">
        <div className="mb-[2%]">
          <p className="flex items-center gap-[5px] font-[500]"><span className="material-symbols-outlined text-[#199f93]">hotel_class</span> Kintel Ai</p>
        </div>
        <form className="flex flex-col gap-[10px]" onSubmit={generateImage}>
          <label className="font-[500]" htmlFor="prompt">Prompt</label>
          <textarea className="p-[5px] italic outline-none border-[1px] rounded-[7px] border-gray-300" name="prompt" id="prompt" rows="5" placeholder="Describe what you want to see..." required></textarea>
          <button type="submit" className="rounded-[7px] py-[2%] bg-[#199f93] text-white flex gap-[5px] items-center justify-center font-[600]">Generate Image <span className="material-symbols-outlined">arrow_right_alt</span></button>
        </form>
        <button onClick={handleCreatePost} disabled={generating === true ? "disabled" : ""} className="checkout-button rounded-[7px] py-[2%] bg-[#199f93] text-white flex gap-[5px] items-center justify-center font-[600]">Create Post <span className="material-symbols-outlined">heart_check</span></button>
        {
          isImageExist===false?<p className="text-red-500">First generate an image...</p> :""
        }
      </div>
      <div className="p-[5%] flex items-center justify-center">
        {
          generating === true? <Mosaic size="large" color={["#33CCCC", "#33CC36", "#B8CC33", "#FCCA00"]} />: <img className="object-center object-cover w-[400px] mx-[auto]" src={photos === true ? `data:image/png;base64,${genImage}`: dummy} alt="Generated Image" />
        }
      </div>
    </div>
  )
}
