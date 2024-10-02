import { getQuestions } from '../../utils/db';
import Form from '@/app/components/Form';


const IntakeForm = async ({ params }) => {
    const  { type } = await params;
    console.log(type);
    const data = await getQuestions(type);
    console.log(data); 
    
    return (

        <Form data={data} />
    
    )
}

export default IntakeForm;