package com.mintic.usa.AlquilerCloud.Web;

import com.mintic.usa.AlquilerCloud.Service.CloudService;
import com.mintic.usa.AlquilerCloud.Modelo.Cloud;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Cloud")
@CrossOrigin(origins="*", methods = {RequestMethod.GET, RequestMethod.PUT, RequestMethod.POST, RequestMethod.DELETE})
public class CloudController {
    @Autowired
    private CloudService cloudService;

    @GetMapping("/all")
    public List<Cloud> getClouds(){
        return cloudService.getAll();
    }
    @GetMapping("/{id}")
    public Optional<Cloud> getCloud(@PathVariable("id")int id){
        return cloudService.getCloud(id);
    }
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Cloud save(@RequestBody Cloud cloud){
        return cloudService.save(cloud);
    }
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Cloud update(@RequestBody Cloud cloud){
        return cloudService.update(cloud);
    }
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int id){
        return cloudService.delete(id);
    }

}
