import { getQuestionnaires } from '../utils/db';
import Link from 'next/link';

const Questionnaires = async () => {
    const data = await getQuestionnaires();

    // capitalize the first letter since it is lowercase in database
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
      <div className="flex flex-col items-center py-8 px-4">
        <h1 className="text-3xl font-bold text-cyan-600 text-center mb-8">Please choose a questionnaire to get started:</h1>
        <ul className="flex flex-col items-center w-full">
          {data.map((item) => (
            <li key={item.id} className="w-3/4 bg-cyan-600 py-2 px-4 text-center my-2 rounded-md ">  
              <Link href={`/questionnaires/${item.name}`} className="text-xl text-white hover:text-cyan-500 hover:underline transition-colors">
                {capitalizeFirstLetter(item.name)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
    
};

export default Questionnaires;
