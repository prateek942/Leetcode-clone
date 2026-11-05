import React, { useEffect, useState } from 'react'
import Navbar from '@/components/Header/playgroundNavbar'
import Split from 'react-split';
import CodeMirror from "@uiw/react-codemirror";
import { python } from '@codemirror/lang-python';
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { Problem, Users } from '@/helpers/type'
import UserConsole from '@/components/Workspace/Playground/console/consoleRunner';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

type props = {
  user : Users,
  problems: [Problem],
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const Playground = ({ user, problems, setSuccess}: props) => {

  const params = useParams<any>();
  
  
  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
  const [clickedProblemsId, setClickedProblemId] = useState<string>();
  const [clickedProblems, setClickedProblems] = useState<Problem>();
  const [userCode, setUserCode] = useState<string>();
  const [output, setOutput] = useState<string | null>(null);

  // Set the Main problems among all problems Which store in clickedProblems
  useEffect(() => {
    if (problems) {
      problems.forEach((problem: any, index) => {
        if (problem.id === params.id) {
          setClickedProblems(problem);
          setClickedProblemId(problem._id);
        }
      })
    }
  }, [problems])

  // console.log(clickedProblems);

  // When the user come to the particular code section the code automatically dispaly perviously written code
  useEffect(() => {
    const code = localStorage.getItem(`code -${clickedProblems?.id}`);
    // console.log(code);
    if (code === '""' || code === null) {
      // console.log(clickedProblems?.starterCode)
      setUserCode(clickedProblems?.starterCode)
    }else{
      setUserCode(JSON.parse(code))
    }
   
  }, [clickedProblems?.id])
  
  // Handle the onChange event
  const handleCodeChange = (value: string) => {
    setUserCode(value);
  }
  // Handle the user Written Code
  const handleRun = async() => {
    try {
      localStorage.setItem(`code -${clickedProblems?.id}`, JSON.stringify(userCode));  // Set the code into local storage
      const res= await axios.post("/api/languages/python/run",{
        code : JSON.parse(JSON.stringify(userCode)),
      });

      // console.log(JSON.parse(userCode))

      if (res.data.success === true) {
        setOutput(`Output :  ${res.data.data}`);
        toast.success(res.data.message,{
          position: "top-center",
          autoClose: 2000,
          theme: "light"
        });
      }else{
        setOutput(`Error: ${res.data.error}`);
        toast.error(res.data.message,{
          position: "top-center",
          autoClose: 2000,
          theme: "dark"
        });
      }
     

    } catch (error: any) {
      setOutput(`Error: ${error.message}`);
    }
  }



  const handleSubmit = async () => {
    try {
      const ids = user?.problemList.map((prob: any) => prob?._id);
      const foundIndex = ids.indexOf(clickedProblemsId);
      
      const res= await axios.post("/api/languages/python/submit",{
        user : user,
        index: foundIndex,
        code : JSON.parse(JSON.stringify(userCode)),
        problem: clickedProblems
      });

      if (res.data.success === true) {
        setSuccess(true);
        setOutput(`Output :  ${res.data.data}`);
        toast.success(res.data.message,{
          position: "top-center",
          autoClose: 2000,
          theme: "light"
      });

      }else{
        setOutput(`Error: ${res.data.error}`);
        toast.error(res.data.message,{
          position: "top-center",
          autoClose: 2000,
          theme: "dark"
        });
      }

    } catch (error) {
      console.log(error);
    }
  }


  const isError = output?.startsWith('Error');

  return (
    <div className='flex h-full flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900'>
      <Navbar />
      <Split className="min-h-0 flex-1" direction="vertical" sizes={[60, 40]} minSize={100} gutterSize={6}>
        <div className='w-full overflow-auto bg-zinc-900'>
          <CodeMirror
            value={userCode}
            theme={vscodeDark}
            onChange={handleCodeChange}
            extensions={[python()]}
            style={
              { fontSize: "14px" }
            }
          />
        </div>

        {/* testcase section */}
        <div className='w-full overflow-auto border-t border-zinc-800 px-4 pb-4'>
          <div className='flex h-10 items-center'>
            <div className='relative flex h-full items-center text-sm font-medium text-white'>
              Testcases
              <span className='absolute bottom-0 h-0.5 w-full rounded-full bg-amber-400' />
            </div>
          </div>
          <div className='mt-3 flex flex-wrap gap-2'>
            {clickedProblems?.examples.map((example, index) => (
              <button
                key={example.id}
                onClick={() => setActiveTestCaseId(index)}
                className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${activeTestCaseId === index
                  ? 'bg-zinc-700 text-white'
                  : 'bg-zinc-800/60 text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
              >
                Case {index + 1}
              </button>
            ))}
          </div>

          <div className='mt-4 space-y-3'>
            <div>
              <p className='text-xs font-medium text-zinc-500'>Input</p>
              <div className='mt-1.5 rounded-md border border-zinc-800 bg-zinc-950/60 px-3 py-2 font-mono text-sm text-zinc-200'>
                {clickedProblems?.examples[activeTestCaseId].inputText}
              </div>
            </div>
            <div>
              <p className='text-xs font-medium text-zinc-500'>Expected output</p>
              <div className='mt-1.5 rounded-md border border-zinc-800 bg-zinc-950/60 px-3 py-2 font-mono text-sm text-zinc-200'>
                {clickedProblems?.examples[activeTestCaseId].outputText}
              </div>
            </div>
            {output && (
              <div>
                <p className={`text-xs font-medium ${isError ? 'text-rose-400' : 'text-emerald-400'}`}>Result</p>
                <div className={`mt-1.5 whitespace-pre-wrap rounded-md border px-3 py-2 font-mono text-sm ${isError
                  ? 'border-rose-500/20 bg-rose-500/5 text-rose-200'
                  : 'border-emerald-500/20 bg-emerald-500/5 text-emerald-100'}`}>
                  {output}
                </div>
              </div>
            )}
          </div>
        </div>
      </Split>
      <UserConsole handleRun={handleRun} handleSubmit={handleSubmit} output={output} />
    </div>
  )
}

export default Playground
