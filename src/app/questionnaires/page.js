import { getQuestionnaires } from '../utils/db';
import Link from 'next/link';

const Questionnaires = async () => {
    const data = await getQuestionnaires();

    // capitalize the first letter since it is lowercase in database
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
      <div>
        <h1>Please choose a questionnaire to get started:</h1>
        <ul>
          {data.map((item) => (
            <li key={item.id}> 
              <Link href={`/questionnaires/${item.name}`}>
                {capitalizeFirstLetter(item.name)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
};

export default Questionnaires;
