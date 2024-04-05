import { useState , useEffect } from 'react';
import { useParams,  useNavigate  } from 'react-router-dom';

export default function Details() {

    const { id } = useParams();
    const navigate = useNavigate(); 
    const [food, setFood]= useState('');
    const [error ,setError] = useState('');

    useEffect(() => {
        const getMenu = async () => {
            try {
                let recipeId = id;
                if (!recipeId) {
                    // If id is not set, try to get it from localStorage
                    const lastId = localStorage.getItem("lastid");
                    if (lastId) {
                        recipeId = lastId;
                    } else {
                        // If neither id nor lastid is available, navigate to the home page
                        navigate("/home"); 
                        return; 
                    }
                }

                const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=4b666b3276014afa8afa1a36d2280e59`);
                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem("lastid",recipeId);
                    setFood(data);
                }
                else  
                { 
                    const data = await response.json();
                    setError(`CODE : ${data.code}, ${data.message}`)
                }
            } catch (error) {
                console.log("Error in fetching Food recipes Data", error);
            }
        };

        getMenu();
    }, [id, navigate]);


    return(
        <>
        { food? (
        <div className="pt-24 px-5 lg:py-10 flex flex-col lg:flex-row justify-start lg:justify-between ">
             <div className="rounded-xl overflow-hidden">
                 <img className="w-full rounded-xl" src={food.image} alt="food image"></img>
            </div>
            <div className=" w-full lg:w-1/2 text-left px-5 py-5 flex flex-col gap-2.5">
                <h1 className="text-green">{food.title}</h1>
                {food.vegan && <p>Vegan</p>}
                <h2 className="font-xxl font-bold">Details</h2>
                <p dangerouslySetInnerHTML={{ __html: food.summary }}></p>
                <details>
                    <summary className='font-bold'>Ingredients</summary>
                    <ul>
                    {food.extendedIngredients.map((ingredient, index) => (
                            <li key={index}>{ingredient.original}</li>
                        ))}
                    </ul>
                </details>
                <h2 className="font-xl font-bold">Steps</h2>
                {food.analyzedInstructions[0].steps.map((step, index) => (
                    <details key={index}>
                        <summary>Step {step.number}</summary>
                        <p>{step.step}</p>
                    </details>
                ))}
            </div>
        </div>
        ):(<div> 
            { error? (
                <div className="mt-0" >
                <div className='m-auto pt-96 text-bold text-xl'>
                   { error }
                </div>
                </div>
            ):(
                <h2 className='text-bold'> Loading ...</h2>
            ) 
            }
          
        </div>)}
        </>
    )
}