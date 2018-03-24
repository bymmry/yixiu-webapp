import App from './App'
import enterRules from './pages/enterRules.vue'
import wait from './pages/wait.vue'

export default [{
  path: '/businessRegister',
  component: App
}, 
{
  path: '/enterRules',
  component: enterRules
},
{
  path: '/wait',
  component:wait
}]
