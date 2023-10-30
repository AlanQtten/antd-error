import { Button, Drawer } from "antd";
import { Component, createElement, createRef, useEffect, useLayoutEffect, useRef, useState } from "react";

class ComponentA extends Component {
  _node = createRef<HTMLElement>()

  render() {
    return createElement('div', {
      ref: this._node
    }, 'component A')
  }

  componentDidMount(): void {
    console.log('class component mounted')
    console.log(Object.getPrototypeOf(this._node.current))
    console.log(getComputedStyle(this._node.current!).position)
  }

  // _setRef = (n: HTMLElement) => {
  //   this._node = n
  // }
}

function ComponentB() {
  const ref = useRef(null)

  useEffect(() => {
    console.log('function component mounted')
    console.log(Object.getPrototypeOf(ref.current))
    console.log(getComputedStyle(ref.current!).position)
  }, [])

  return <div ref={ref}>componentB</div>
}

export default function App() {
  const [openA, setOpenA] = useState(false);
  const [openB, setOpenB] = useState(false);

  return <>
    <div> 
      <div>drawer A include a class component</div>
      <div>drawer B include a function component</div>
      <div>both brawer set with forceRender</div>
    </div>
    <Button onClick={() => {setOpenA(true)}}>open drawerA</Button>
    <Button onClick={() => {setOpenB(true)}}>open drawerB</Button>

    <Drawer forceRender open={openA} onClose={() => {setOpenA(false)}}>
      <ComponentA />
    </Drawer>
    <Drawer forceRender open={openB} onClose={() => {setOpenB(false)}}>
      <ComponentB />
    </Drawer>
  </>
}