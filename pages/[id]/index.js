import fetch from 'isomorphic-unfetch';
import GaugeChart from 'react-gauge-chart';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Confirm, Button, Loader, Card } from 'semantic-ui-react';

const RaForm = ({ raForm }) => {
    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const deleteRaForm = async () => {
            const raFormId = router.query.id;
            try {
                const deleted = await fetch(`/api/raForms/${raFormId}`, {
                    method: 'Delete'
                });
                router.push('/secret');
            } catch (error) {
                console.log(error)
            }
        }
        if (isDeleting) {
            deleteRaForm();
        }
    }, [isDeleting, router])

    const open = () => setConfirm(true);

    const close = () => setConfirm(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        close();
    }

    const colorId = (question) => {
        const val = Number(question);
        if (val >= 0 && val <= 33) {
            return 'red';
        }
        if (val >= 34 && val <= 66) {
            return 'yellow';
        }
        else return 'green';
    }

    const getAveTh = () => {
        const total =
        (Number(raForm.th0) + Number(raForm.th1) + Number(raForm.th2) + Number(raForm.th3) + Number(raForm.th4) +
        Number(raForm.th5) + Number(raForm.th6) + Number(raForm.th7) + Number(raForm.th8) + Number(raForm.th9) +
        Number(raForm.th10))
        return (Math.round(total/12));
    }
    const thAve = getAveTh();
    let thPercent = Number(`0.${thAve}`)
    if (thAve === 100) {
      thPercent = 1;
    }

    const getAveVm = () => {
        const total =
        (Number(raForm.vm0) + Number(raForm.vm1) + Number(raForm.vm2) + Number(raForm.vm3) + Number(raForm.vm4) +
        Number(raForm.vm5) + Number(raForm.vm6) + Number(raForm.vm7) + Number(raForm.vm8) + Number(raForm.vm9) +
        Number(raForm.vm10) + Number(raForm.vm11))
        return (Math.round(total/12));
    }
    const vmAve = getAveVm();
    let vmPercent = Number(`0.${vmAve}`)
    if (vmAve === 100) {
      vmPercent = 1;
    }

    const guageStyle = {
        width: '75%',
      }

    return (
        <div className='raForm-container'>
            {isDeleting
                ? <Loader active />
                :
                <>
                    <h1 id='raTitle'>{raForm.title}</h1>
                    <div className='raFormItem'>
                      <h2 id='raHeader'>Threat Hunting: <span id={colorId(thAve)}>{thAve}%</span></h2>
                      <div className='guage'>
                      <GaugeChart
                        style={guageStyle}
                        id='gauge-chart3'
                        nrOfLevels={5}
                        colors={['#FF4C00', '#FF9E15', '#A2D683']}
                        arcWidth={0.4}
                        percent={thPercent}
                        textColor='#07224C'
                        hideText={true} />
                      </div>
                    </div>

                    <h3>Vulnerability Management: <span id={colorId(vmAve)}>{vmAve}%</span></h3>
                    <div className='guage'>
                    <GaugeChart
                        style={guageStyle}
                        id='gauge-chart3'
                        nrOfLevels={5}
                        colors={['#FF4C00', '#FF9E15', '#A2D683']}
                        arcWidth={0.4}
                        percent={vmPercent}
                        textColor='#07224C'
                        hideText={true} />
                    </div>

                    <Button id='delete' onClick={open}>Delete</Button>
                </>
            }
            <Confirm
                open={confirm}
                onCancel={close}
                onConfirm={handleDelete}
            />
        </div>
    )
}

RaForm.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`/api/raForms/${id}`);
    const { data } = await res.json();

    return { raForm: data }
}

export default RaForm;