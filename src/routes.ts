import { Router } from 'express'
import { HelloWorldController } from '@/controllers/HelloWorldController'

const helloWorldController = new HelloWorldController()
const router = Router()

router.get('/', helloWorldController.default)

export default router
