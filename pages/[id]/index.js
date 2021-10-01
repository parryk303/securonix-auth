import fetch from 'isomorphic-unfetch';
import GaugeChart from 'react-gauge-chart';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Confirm, Button, Loader, Card } from 'semantic-ui-react';
import { jsPDF } from "jspdf";

const threatHunting = ['Establishing threat hunting goals', 'Current coverage of threat hunting goals', 'Hiring personnel dedicated to threat hunting', 'Formulating a threat hunting hypothesis', 'Acquiring specialized datasets and tools', 'Threat hunting training', 'SOC members who can develop needed cybersecurity scripts', 'Ability to scale threat hunting program', 'Utilizing full packet capture', 'Utilizing windows registry keys', 'Utilizing system memory'];

const vulnerabilityManagement = ['Well Defined and maintained assets and their risk tolerance', 'Well Defined and maintained Application and their risk tolerance', 'Effective collaboration between IT & security teams', 'Sharing, communicating vulnerability with other teams', 'Completion of scanning all software', 'Completion of scanning all hardware', 'Completion of scanning all web applications', 'Identifying and prioritizing risk relative to the environment', 'Action tasks on devices to eliminate security risks', 'Deploying os & third-party patches', 'Deploying windows 10 feature updates', 'Remediating vulnerability']

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
        return (Math.round(total / 12));
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
        return (Math.round(total / 12));
    }
    const vmAve = getAveVm();
    let vmPercent = Number(`0.${vmAve}`)
    if (vmAve === 100) {
        vmPercent = 1;
    }

    const guageStyle = {
        width: '58%',
    }

    const pdf = () => {
        const doc = new jsPDF();
        doc.addImage('https://i.imgur.com/dISO4s0.jpeg', "JPEG", 30, 0, 150, 50), doc.setFont('helvetica', 'bold')

        doc.text(`Risk Assessment Report for ${raForm.title} :`, 12, 55)
        doc.text(`Threat Hunting Average: ${thAve}%`, 12, 70), doc.setFont('helvetica', 'normal')
        doc.text(`${threatHunting[0]}: ....................................................... `, 12, 76)
        doc.text(`${raForm.vm0}%`, 186, 76)
        doc.text(`${threatHunting[1]}: ........................................... `, 12, 82)
        doc.text(`${raForm.vm0}%`, 186, 82)
        doc.text(`${threatHunting[2]}: ..................................... `, 12, 88)
        doc.text(`${raForm.vm0}%`, 186, 88)
        doc.text(`${threatHunting[3]}: ............................................ `, 12, 94)
        doc.text(`${raForm.vm0}%`, 186, 94)
        doc.text(`${threatHunting[4]}: ........................................... `, 12, 100)
        doc.text(`${raForm.vm0}%`, 186, 100)
        doc.text(`${threatHunting[5]}: ....................................................................... `, 12, 106)
        doc.text(`${raForm.vm0}%`, 186, 106)
        doc.text(`${threatHunting[6]}: ......... `, 12, 112)
        doc.text(`${raForm.vm0}%`, 186, 112)
        doc.text(`${threatHunting[7]}: ............................................... `, 12, 118)
        doc.text(`${raForm.vm0}%`, 186, 118)
        doc.text(`${threatHunting[8]}: ................................................................. `, 12, 124)
        doc.text(`${raForm.vm0}%`, 186, 124)
        doc.text(`${threatHunting[9]}: ........................................................... `, 12, 130)
        doc.text(`${raForm.vm0}%`, 186, 130)
        doc.text(`${threatHunting[10]}: ..................................................................... `, 12, 136)
        doc.text(`${raForm.vm0}%`, 186, 136)

        doc.setFont('helvetica', 'bold')
        doc.text(`Vulnerability Managment Average: ${vmAve}%`, 12, 156)
        doc.setFont('helvetica', 'normal')
        doc.text(`${vulnerabilityManagement[0]}: ............. `, 12, 162)
        doc.text(`${raForm.vm0}%`, 186, 162)
        doc.text(`${vulnerabilityManagement[1]}: ...... `, 12, 168)
        doc.text(`${raForm.vm1}%`, 186, 168)
        doc.text(`${vulnerabilityManagement[2]}: .......................... `, 12, 174)
        doc.text(`${raForm.vm2}%`, 186, 174)
        doc.text(`${vulnerabilityManagement[3]}: ...................... `, 12, 180)
        doc.text(`${raForm.vm3}%`, 186, 180)
        doc.text(`${vulnerabilityManagement[4]}: ................................................... `, 12, 186)
        doc.text(`${raForm.vm4}%`, 186, 186)
        doc.text(`${vulnerabilityManagement[5]}: .................................................. `, 12, 192)
        doc.text(`${raForm.vm5}%`, 186, 192)
        doc.text(`${vulnerabilityManagement[6]}: ...................................... `, 12, 198)
        doc.text(`${raForm.vm6}%`, 186, 198)
        doc.text(`${vulnerabilityManagement[7]}: ................. `, 12, 204)
        doc.text(`${raForm.vm7}%`, 186, 204)
        doc.text(`${vulnerabilityManagement[8]}: ............................. `, 12, 210)
        doc.text(`${raForm.vm8}%`, 186, 210)
        doc.text(`${vulnerabilityManagement[9]}: ..................................................... `, 12, 216)
        doc.text(`${raForm.vm9}%`, 186, 216)
        doc.text(`${vulnerabilityManagement[10]}: .............................................. `, 12, 222)
        doc.text(`${raForm.vm10}%`, 186, 222)
        doc.text(`${vulnerabilityManagement[11]}: ....................................................................`, 12, 228)
        doc.text(`${raForm.vm11}%`, 186, 228)
        doc.save(`${raForm.title} RA Report.pdf`);
    }

    return (
        <div className='raForm-container'>
            {isDeleting
                ? <Loader active />
                :
                <>
                    <h1 id='raTitle'>{raForm.title}</h1>
                    <Button id='pdf' onClick={pdf}>Generate Assessment Report.pdf</Button>
                    <div>
                        <h2 id='raHeader'>
                            Threat Hunting: <span id={colorId(thAve)}>{thAve}%</span>
                        </h2>
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
                    <h2 id='raHeader'>
                        Vulnerability Management: <span id={colorId(vmAve)}>{vmAve}%</span>
                    </h2>
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