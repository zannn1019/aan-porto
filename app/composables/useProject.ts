import projectData from '@/data/project.json'
import { ref } from 'vue'

export const useProject = () => {
    const projects = ref(projectData)

    return {
        projects,
    }
}