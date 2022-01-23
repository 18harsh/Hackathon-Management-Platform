import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { List } from 'antd';
import {Octokit} from "@octokit/core";
import {useParams} from "react-router-dom";
import {  collection,  onSnapshot, query, where} from "firebase/firestore";
import {db} from "../../firebaseConfig/firebaseConfig";


const octokit = new Octokit({auth: "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"});




const useStyles = makeStyles({
    root: {
        overflow: 'auto',
        height:"82vh",
        backgroundColor:"white",
        margin:10
    },
    paper: {
        position: 'absolute',
        width: 300,
        display:"flex",
        flexDirection:"column",

        backgroundColor: "#FAEEE7",
        border: '2px solid #000',
        boxShadow: "#FAEEE7",
        padding: 10,
    },
});

export default function Github_data(props) {

    let {hackathonId,teamId} = useParams();
    const [hacks, setHacks] = useState([]);
    const [branches, setBranches] = useState({});
    const [commits, setCommits] = useState({});
    const [fileDirectory, setFileDirectory] = useState({});
    // getModalStyle is not a pure function, we roll the style only on the first render

    useEffect(async () => {
        const particpiapntRef = collection(db, "hackathons", hackathonId, "participants");
        const q = query(particpiapntRef, where("team_id", "==", teamId));

        const unsubscribe = onSnapshot(q, async (querySnapshot) => {
            const hack = [];
            querySnapshot.forEach((doc) => {
                hack.push({hackathons: doc.data(), hackathonId: doc.id});
            });
            setHacks(hack);
            console.log(hack)


        })
            await octokit.request('GET /repos/{owner}/{repo}/branches', {
                owner: hacks[0].hackathons.repoOwner,
                repo:  hacks[0].hackathons.repoName,
            }).then(res => {
                console.log(res);
                setBranches(res)
            })

            await octokit.request('GET /repos/{owner}/{repo}/commits', {
                owner: hacks[0].hackathons.repoOwner,
                repo:  hacks[0].hackathons.repoName,
            }).then(res => {
                console.log(res);
                setCommits(res)
            })

        await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
            owner: hacks[0].hackathons.repoOwner,
            repo:  hacks[0].hackathons.repoName,

        }).then(res => {
            console.log(res);
            setFileDirectory(res)
        })

        // await octokit.request('GET /repos/{owner}/{repo}/collaborators', {
        //     owner: '18harsh',
        //     repo: 'A-Study-On-The-Insights-Data-Set'
        // }).then(res=>{
        //     console.log(res);
        // })

    },[])




    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };




    return (
        <div style={{
            display:'flex',
            flexDirection:"row"
        }}>
            <div style={{
                width:300,margin:10
            }}>
                <List
                    header={<div>Branches</div>}

                    bordered
                    dataSource={branches.data}
                    renderItem={item => (
                        <List.Item>
                            Branch Name:- {item.name}
                        </List.Item>
                    )}
                />
            </div>
            <div style={{
                width:300,margin:10
            }}>
                <List
                    header={<div>Commits</div>}

                    bordered
                    dataSource={commits.data}
                    renderItem={item => (
                        <List.Item>
                            {item.author.login} :- {item.commit.committer.date}
                        </List.Item>
                    )}
                />
            </div>
            <div style={{
                width:300,
                margin:10
            }}>
                <List
                    header={<div>Folder and Files</div>}

                    bordered
                    dataSource={fileDirectory.data}
                    renderItem={item => (
                        <List.Item>
                             <a href={item.html_url}>{item.name}</a>
                        </List.Item>
                    )}
                />

            </div>
        </div>
    );
}
