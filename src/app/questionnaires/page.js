import { getQuestionnaires } from '../utils/db';
import Link from 'next/link';

const Questionnaires = async () => {
    const data = await getQuestionnaires();

    return (
      <div>
        <h1>Data from PostgreSQL</h1>
        <ul>
          {data.map((item) => (
            <li key={item.id}> 
              <Link href={`/questionnaires/${item.name}`}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
};

export default Questionnaires;
