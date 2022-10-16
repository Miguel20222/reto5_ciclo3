package com.mintic.usa.AlquilerCloud.Service;

import com.mintic.usa.AlquilerCloud.Repository.CloudRepository;
import com.mintic.usa.AlquilerCloud.Modelo.Cloud;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CloudService {
    @Autowired
    private CloudRepository cloudRepository;

    public List<Cloud> getAll(){
        return cloudRepository.getAll();
    }
    public Optional<Cloud> getCloud(int id){
        return cloudRepository.getCloud(id);
    }
    public Cloud save(Cloud cloud){
        if(cloud.getId() == null){
            return cloudRepository.save(cloud);
        }else{
            Optional<Cloud> b = cloudRepository.getCloud(cloud.getId());
            if(b.isPresent()){
                return cloud;
            }else{
                return cloudRepository.save(cloud);
            }
        }
    }

    public Cloud update(Cloud cloud){
        if(cloud.getId() !=null){
            Optional<Cloud> b= cloudRepository.getCloud(cloud.getId());
            if(b.isPresent()){
                if(cloud.getName()!= null){
                    b.get().setName(cloud.getName());
                }
                if(cloud.getBrand() != null){
                    b.get().setBrand(cloud.getBrand());
                }
                if(cloud.getYear() != null){
                    b.get().setYear(cloud.getYear());
                }
                if(cloud.getDescription() != null){
                    b.get().setDescription(cloud.getDescription());
                }
                if(cloud.getCategory() != null){
                    b.get().setCategory(cloud.getCategory());
                }
                cloudRepository.save(b.get());
                return b.get();
            }else{
                return cloud;
            }
        }else{
            return cloud;
        }
    }
    public boolean delete(int id){
        boolean flag = false;
        Optional<Cloud> b = cloudRepository.getCloud(id);
        if(b.isPresent()){
            cloudRepository.delete(b.get());
            flag = true;
        }
        return flag;
    }
}
